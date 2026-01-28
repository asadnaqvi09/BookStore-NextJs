const mongoose = require("mongoose");
const Book = require("../models/bookModel");
const WishList = require("../models/wishListModel");

const addToWishList = async (req, res) => {
  try {
    const { bookId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    let wishList = await WishList.findOne({ user: req.user._id });

    if (!wishList) {
      wishList = new WishList({
        user: req.user._id,
        items: [{ book: bookId }],
      });
    } else {
      if (wishList.items.some((i) => i.book.toString() === bookId)) {
        return res.json({ message: "Already in wishlist", items: wishList.items });
      }
      wishList.items.push({ book: bookId });
    }

    await wishList.save();
    const populated = await wishList.populate("items.book");
    res.json({ items: populated.items });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getWishList = async (req, res) => {
  try {
    const wishList = await WishList.findOne({ user: req.user._id }).populate("items.book");

    if (!wishList) {
      return res.json({ items: [] });
    }

    res.json({ items: wishList.items });
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error: error.message });
  }
};

const removeFromWishList = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const wishList = await WishList.findOne({ user: req.user._id });
    if (!wishList) {
      return res.json({ items: [] });
    }

    wishList.items = wishList.items.filter((i) => i.book.toString() !== bookId);
    await wishList.save();

    const populated = await wishList.populate("items.book");
    res.json({ items: populated.items });
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error: error.message });
  }
};

const toggleWishlist = async (req, res) => {
  try {
    const { bookId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    let wishList = await WishList.findOne({ user: req.user._id });

    if (!wishList) {
      wishList = new WishList({
        user: req.user._id,
        items: [{ book: bookId }],
      });
      await wishList.save();
      const populated = await wishList.populate("items.book");
      return res.json({ action: "added", items: populated.items });
    }

    const index = wishList.items.findIndex((i) => i.book.toString() === bookId);

    if (index > -1) {
      wishList.items.splice(index, 1);
      await wishList.save();
      const populated = await wishList.populate("items.book");
      return res.json({ action: "removed", items: populated.items });
    }

    wishList.items.push({ book: bookId });
    await wishList.save();
    const populated = await wishList.populate("items.book");
    res.json({ action: "added", items: populated.items });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addToWishList,
  getWishList,
  removeFromWishList,
  toggleWishlist,
};