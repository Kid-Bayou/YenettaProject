const Joi = require("joi");

const asyncHandler = require("express-async-handler");

const User = require("../model/userModel")

const Product = require("../model/userModel");

const getAllProducts = asyncHandler(async(req, res) => {
  const products = await Product.find();
  res.status(200).json(products)
})

const getProducts = async (req, res) => {
  const product = await Product.find({user: req.user.id});
  res.status(200).json(product);
};

const createProduct = async (req, res) => {

  const products = await Product.create({
    user: req.user.id,
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

  const user = await UserActivation.findById(req.user.id)
  if(!user){
    res.status(401).json({error: "User not found"})
  }

  if(product.user.toString() !== user.id){
    res.status(401).json({error: "User not authorized"})
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

  const user = await UserActivation.findById(req.user.id)
  if(!user){
    res.status(401).json({error: "User not found"})
  }

  if(product.user.toString() !== user.id){
    res.status(401).json({error: "User not authorized"})
  }

  const deletedProduct = await Product.findByIdAndRemove(req.params.id)

  res.status(200).json({ message: "Deleted Product Successfully" });
};

module.exports = {
  getAllProducts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
