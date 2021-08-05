const express = require("express");
const router = express.Router();
const Store = require("../../models/Store");

//@route GET /products
//@access public
//@desc GET ALL Product
router.get("/", async (req, res) => {
  try {
    const stores = await Store.find();
    if (!stores) return res.status(404).json({ msg: "No Store!" });

    const products = [];
    stores.forEach((store) => {
      store.products.forEach((product) => {
        const { date, _id, name, price, stock, pathName, pathType } = product;
        const path = `data:${pathType};charset=utf-8;base64,${pathName.toString(
          "base64"
        )}`;
        products.push({
          storeName: store.name,
          storeId: store.id,
          _id,
          name,
          price,
          stock,
          path,
          date,
        });
      });
    });
    products.sort((a, b) => new Date(b.date) - new Date(a.date));
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
