const Joi = require("joi");
const getProducts = (req, res) => {
  res.status(200).json({ message: "Get all my Products" });
};

const createProduct = (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ errors: error.details.map((err) => err.message) });
  }

  res.status(200).json({ message: "Create Product" });
};

const updateProduct = (req, res) => {
  res.status(200).json({ message: "Update Products" });
};

const deleteProduct = (req, res) => {
  res.status(200).json({ message: "Update Products" });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
