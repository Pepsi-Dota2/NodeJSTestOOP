const Product = require("../models/product.models");

exports.findAllController = (req, res) => {
  Product.getAll((err, data) => {
    {
      if (err) {
        res.status(500).send({
          message: err.message || "Error fetch Products",
        });
      } else res.send(data);
    }
  });
};


exports.createController = (req, res) => {
  // Validate request
  if (!req.body.pro_name || !req.body.pro_qty || !req.body.price) {
    res
      .status(400)
      .send({ message: "Product name , qty , price can't be empty!" });
    return;
  }

  //create a product Object
  const newProduct = new Product({
    pro_name: req.body.pro_name,
    pro_qty: req.body.pro_qty,
    price: req.body.price,
  });
  console.log(newProduct);

  Product.Create(newProduct, (err, data) => {
    {
      if (err) {
        res.status(500).send({
          message: err.message || "Error fetch Products",
        });
      } else res.status(201).send(data);
    }
  });
};

exports.updateController = (req, res) => {
  //Validate request
  if (!req.body) {
    res.status(400).send({ message: "Data to update can't be empty" });
    return;
  }

  //update the product in the database
  Product.updateById(req.params.id, req.body, (error, date) => {
    if (error) {
      if (error.kind === "not found") {
        res
          .status(404)
          .send({ message: `Product with id ${req.params.id} not found` });
      } else {
        res
          .status(500)
          .send({ message: `Error updating product ${req.params.id}` });
      }
    } else {
      res.send(date);
    }
  });
};

exports.removeController = (req, res) => {
  // Delete the product from the database
  Product.remove(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not found") {
        res
          .status(404)
          .send({ message: `Product with id ${re1.params.id} not found` });
      } else {
        res.status(500).send({
          message: `Could not delete product with id  ${req.params.id}`,
        });
      }
    } else {
      res.send({ message: "Product was remove successfully" });
    }
  });
};
