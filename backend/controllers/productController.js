const Joi = require("joi");

const asyncHandler = require("express-async-handler");

const Product = require("../model/productModel");

const getProducts = async (req, res) => {
  const product = await Product.find();
  res.status(200).json(product);
};

const createProduct = async (req, res) => {

  const products = await Product.create({
    name: req.body.name,
    description: req.body.description,
  });
  res.status(200).json(products);
};

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400).json({ error: "product not found" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json({updatedProduct})

};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(!product) {
    res.status(400).json({error: "todo not found"})
  }

  const deletedProduct = await Product.findByIdAndRemove(req.params.id)

  res.status(200).json({ message: "Deleted Product Successfully" });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
