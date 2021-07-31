const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Store = require("../../models/Store");
const imageMimeTypes = [
  "images/jpeg",
  "images/gif",
  "images/png",
  "images/jpg",
];

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
    check("name", "Name field is required").not().isEmpty(),
    check("price", "Price field is required").not().isEmpty(),
    check("stock", "Stock field is required").not().isEmpty(),
    check("pathName", "Path name field is required").not().isEmpty(),
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

      const productImagePath = JSON.parse(pathName);
      if (
        productImagePath !== null &&
        imageMimeTypes.includes(productImagePath.type)
      ) {
        newProduct.pathName = new Buffer.from(productImagePath.data, "base64");
        newProduct.pathType = productImagePath.type;

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

module.exports = router;
