const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  getCart,
  updateCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.patch("/update", protect, updateCart);
router.delete("/remove/:bookId", protect, removeFromCart);
router.delete("/clear", protect, clearCart);
router.put("/increase/:productId", protect, increaseQuantity);
router.put("/decrease/:productId", protect, decreaseQuantity);

module.exports = router;