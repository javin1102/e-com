const express = require("express");
const router = express.Router();
const Store = require("../../models/Store");

//@route GET /products
//@access public
//@desc GET ALL Product / search product(s)
//@params search, limit
router.get("/", async (req, res) => {
  const limit = !!req.query.limit && parseInt(req.query.limit);

  const search = !!req.query.search && req.query.search.toLowerCase().trim();
  const results = {};

  try {
    if (!search) {
      Store.findRandom({}, {}, { limit: 20 }, function (err, stores) {
        if (!err) {
          if (!stores) return res.status(404).json({ msg: "No Store!" });

          const products = [];
          stores.forEach((store) => {
            store.products.forEach((product) => {
              const { date, _id, name, price, stock, pathName, pathType } =
                product;
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

          results.results = products;
          results.maxPages = Math.ceil(products.length / limit);

          return res.status(200).json(results);
        }
      });
    } else {
      const stores = await Store.find();
      if (!stores) return res.status(404).json({ msg: "No Store!" });
      console.log(search);
      const products = [];
      stores.forEach((store) => {
        store.products.forEach((product) => {
          const lowerProduct = product.name.toLowerCase();
          if (lowerProduct.includes(search)) {
            const { date, _id, name, price, stock, pathName, pathType } =
              product;
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
          }
        });
      });
      if (products.length === 0)
        return res.status(200).json({ msg: "No products found!" });
      else {
        results.results = products;
        results.maxPages = Math.ceil(products.length / limit);
        return res.status(200).json(results);
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
