const express = require("express");
const router = express();
const {
  findAllController,
  createController,
} = require("../controllers/product");

router.get("/product", findAllController);
router.post("/create", createController);

module.exports = router;
