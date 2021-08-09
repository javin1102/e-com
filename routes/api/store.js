const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Store = require("../../models/Store");
const imageMimeTypes = ["image/jpeg", "image/gif", "image/png", "image/jpg"];

//@route GET /store
//@access private
//@desc get user store
router.get("/", auth, async (req, res) => {
  try {
    const store = await Store.findOne({ user: req.userId });
    if (!store)
      return res.status(404).json({ msg: "You don't have a store registered" });

    return res.status(200).json(store);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

//@route POST /store
//@access private
//@desc register user store
router.post(
  "/",
  [auth, [check("name", "Store name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      const store = await Store.findOne({ user: req.userId });
      if (store)
        return res.status(400).json({ msg: "You have a store registered!" });
      const newStore = new Store({
        name: req.body.name,
        user: req.userId,
      });
      await newStore.save();
      res.json(newStore);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

//@route POST /store/product
//@access private
//@desc register product
router.post(
  "/product",
  [
    auth,
    [
      check("name", "Name field is required").not().isEmpty(),
      check("price", "Price field is required").not().isEmpty(),
      check("stock", "Stock field is required").not().isEmpty(),
      check("pathName", "Path name field is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ msg: errors.array() });

    try {
      const store = await Store.findOne({ user: req.userId });
      if (!store) return res.status(400).json({ msg: "Store not found" });

      const { name, price, stock, pathName } = req.body;
      const newProduct = { name, price, stock };
      if (pathName === null)
        return res.status(400).json({ msg: "Path name is empty" });

      if (imageMimeTypes.includes(pathName.type)) {
        newProduct.pathName = new Buffer.from(pathName.data, "base64");
        newProduct.pathType = pathName.type;

        store.products.unshift(newProduct);
        await store.save();
        return res.status(200).json({ store });
      } else return res.status(400).json({ msg: "Invalid image type" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

//@route GET /store/product
//@access private
//@desc GET ALL Product (Store)
router.get("/product", auth, async (req, res) => {
  try {
    const store = await Store.findOne({ user: req.userId });
    if (!store) return res.status(404).json({ msg: "You dont have a store" });
    let p = [];
    store.products.forEach((product) => {
      const path = `data:${
        product.pathType
      };charset=utf-8;base64,${product.pathName.toString("base64")}`;
      const { id, name, price, stock, date } = product;
      p.push({ id, name, price, stock, date, path });
    });
    return res.status(200).json(p);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

//@route GET /store/product/:productId
//@access private
//@desc GET Product By Id (Store)
router.get("/product/:productId", auth, async (req, res) => {
  try {
    const productId = req.params.productId;
    const store = await Store.findOne({ user: req.userId });
    if (!store) return res.status(404).json({ msg: "You dont have a store" });
    const product = store.products.find((product) => product.id === productId);
    if (!product) return res.status(404).json({ msg: "Product not found!" });
    const path = `data:${
      product.pathType
    };charset=utf-8;base64,${product.pathName.toString("base64")}`;
    const { id, name, price, stock, date } = product;
    const newProduct = { id, name, price, path, stock, date };
    return res.status(200).json(newProduct);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

//@route DELETE /store/product/:productId
//@access private
//@desc DELETE product (Store)
router.delete("/product/:productId", auth, async (req, res) => {
  const productId = req.params.productId;
  try {
    const store = await Store.findOne({ user: req.userId });
    if (!store) return res.status(404).json({ msg: "You don't have a store" });
    const product = store.products.find((product) => product.id === productId);
    if (!product) return res.status(404).json({ msg: "Product not found!" });
    const removeIndex = store.products
      .map((product) => product.id)
      .indexOf(productId);
    store.products.splice(removeIndex, 1);
    await store.save();
    let p = [];
    store.products.forEach((product) => {
      const path = `data:${
        product.pathType
      };charset=utf-8;base64,${product.pathName.toString("base64")}`;
      const { id, name, price, stock, date } = product;
      p.push({ id, name, price, stock, date, path });
    });
    return res.status(200).json(p);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

//@route PUT /store/product/:productId
//@access private
//@desc UPDATE product (Store)
router.put(
  "/product/:productId",
  [
    auth,
    [
      check("name", "Name field is required").not().isEmpty(),
      check("price", "Price field is required").not().isEmpty(),
      check("stock", "Stock field is required").not().isEmpty(),
      check("pathName", "Path name field is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(404).json({ msg: errors.array() });
    const productId = req.params.productId;
    try {
      const store = await Store.findOne({ user: req.userId });
      if (!store)
        return res.status(404).json({ msg: "You don't have a store" });
      const product = store.products.find(
        (product) => product.id === productId
      );
      if (!product) return res.status(404).json({ msg: "Product not found!" });
      const { name, price, stock, pathName } = req.body;
      const newProduct = { _id: productId, name, price, stock };

      if (imageMimeTypes.includes(pathName.type)) {
        newProduct.pathName = new Buffer.from(pathName.data, "base64");
        newProduct.pathType = pathName.type;

        const productIndex = store.products
          .map((product) => product.id)
          .indexOf(productId);

        store.products[productIndex] = newProduct;
        await store.save();
        return res.status(200).json(store.products);
      } else return res.status(400).json({ msg: "Invalid image type" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
