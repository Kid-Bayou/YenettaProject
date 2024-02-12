const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "title requried"],
    },
    description: {
      type: String,
      required: [true, "description required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
