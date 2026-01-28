const Cart = require("../models/cartModel");
const Book = require("../models/bookModel");
const mongoose = require("mongoose");

// 🔧 Helper: format cart response consistently
const formatCart = (cart) => {
  if (!cart) return { items: [], totalPrice: 0 };

  const items = cart.items || [];
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  return { items, totalPrice };
};

// ➕ Add to cart
const addToCart = async (req, res) => {
  try {
    const { bookId, quantity = 1 } = req.body;

    if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ book: bookId, quantity, price: book.price || 0 }],
      });
    } else {
      const item = cart.items.find(
        (i) => i.book.toString() === bookId
      );

      if (item) item.quantity += quantity;
      else cart.items.push({ book: bookId, quantity, price: book.price || 0 });
    }

    await cart.save();
    await cart.populate("items.book");
    res.json({ message: "Added to cart", ...formatCart(cart) });
  } catch (error) {
    res.status(500).json({ message: "Add to cart failed", error: error.message });
  }
};

// 🛒 Get cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.book");
    res.json(formatCart(cart));
  } catch (error) {
    res.status(500).json({ message: "Fetch cart failed", error: error.message });
  }
};

// ❌ Remove item
const removeFromCart = async (req, res) => {
  try {
    const { bookId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.json({ items: [], totalPrice: 0 });

    cart.items = cart.items.filter((i) => i.book.toString() !== bookId);
    await cart.save();
    await cart.populate("items.book");
    res.json({ message: "Item removed", ...formatCart(cart) });
  } catch (error) {
    res.status(500).json({ message: "Remove failed", error: error.message });
  }
};

// 🧹 Clear cart
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ items: [], totalPrice: 0 });
  } catch (error) {
    res.status(500).json({ message: "Clear cart failed", error: error.message });
  }
};

// 🔄 Update quantity directly
const updateCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.json({ items: [], totalPrice: 0 });

    const item = cart.items.find((i) => i.book.toString() === bookId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.book");
    res.json({ message: "Cart updated", ...formatCart(cart) });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// ➕ Increase quantity
const increaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.json({ items: [], totalPrice: 0 });

    const item = cart.items.find((i) => i.book.toString() === productId);
    if (item) item.quantity += 1;

    await cart.save();
    await cart.populate("items.book");
    res.json({ message: "Quantity increased", ...formatCart(cart) });
  } catch (error) {
    res.status(500).json({ message: "Increase failed", error: error.message });
  }
};

// ➖ Decrease quantity
const decreaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.json({ items: [], totalPrice: 0 });

    const index = cart.items.findIndex((i) => i.book.toString() === productId);
    if (index > -1) {
      if (cart.items[index].quantity > 1) cart.items[index].quantity -= 1;
      else cart.items.splice(index, 1);
    }

    await cart.save();
    await cart.populate("items.book");
    res.json({ message: "Quantity decreased", ...formatCart(cart) });
  } catch (error) {
    res.status(500).json({ message: "Decrease failed", error: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateCart,
  increaseQuantity,
  decreaseQuantity,
};
