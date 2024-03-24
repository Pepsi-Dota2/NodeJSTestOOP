const mysql = require("./db.model");

//constructor
const Product = function (product) {
  this.id = product.id;
  this.pro_name = product.pro_name;
  this.pro_qty = product.pro_qty;
  this.price = product.price;
};

//fetch all data
Product.getAll = (result) => {
  mysql.query(`SELECT * FROM product`, (err, res) => {
    if (err) {
      console.log("Error : ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Product.Create = (newProduct, result) => {
  mysql.query(`INSERT INTO product SET ?`, newProduct, (err, res) => {
    if (err) {
      console.log("Error : ", err);
      result(null, err);
      return;
    }

    //  it's use for   … show all object
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.updateById = (id, updateProduct, result) => {
  mysql.query(
    `UPDATE product SET ? WHERE id = ?`,
    [updateProduct, id],
    (error, res) => {
      if (error) {
        console.error(error);
        result(error, null);
        return;
      }
      if (res.affectedRows == 0) {
        // Product not found with the specified id
        result({ kind: "not found" }, null);
        return;
      }
      result(null, { id: id, ...updateProduct });
    }
  );
};

Product.remove = (id, result) => {
  mysql.query(`DELETE FROM product WHERE id = ?`, id, (error, res) => {
    if (error) {
      console.error(error);
      result(error, null);
      return;
    }
    if (res.affectedRows == 0) {
      // Product not found with the specified id
      result({ kind: "not found" }, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Product;
