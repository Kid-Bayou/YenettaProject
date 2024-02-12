const express = require("express");
const router = express.Router();
const { productValidator } = require("../middleware/productValidator")
const { protect } = require("../middleware/authMiddleware")
const {
  getAllProducts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { adminValidator } = require("../middleware/adminValidator")

router.route("/").get(protect, getProducts).post(protect, productValidator, createProduct);
router.route("/:id").put(protect, updateProduct).delete(protect, deleteProduct);

router.get("/getAllProducts", protect, adminValidator, getAllProducts)

module.exports = router;