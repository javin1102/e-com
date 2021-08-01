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
      return res.status(400).json({ msg: "You don't have a store registered" });

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
      } else return res.status(400).json({ msg: "Path must not be null" });
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
    let imagePath = [];
    store.products.forEach((product) => {
      const path = `data:${
        product.pathType
      };charset=utf-8;base64,${product.pathName.toString("base64")}`;
      imagePath.push(path);
    });
    return res.status(200).json({ imagePath: imagePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
