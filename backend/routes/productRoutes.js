const express = require("express");
const router = express.Router();
const { productValidator } = require("../middleware/productValidator")
const { protect } = require("../middleware/authMiddleware")
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/").get(getProducts).post(protect, productValidator, createProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;