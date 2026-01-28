const express = require('express');
const { getWishList, addToWishList, removeFromWishList, toggleWishlist } = require('../controllers/wishListController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Protect all wishlist routes to ensure req.user is available
router.get('/', protect, getWishList);
router.post('/add', protect, addToWishList);
router.delete('/remove/:bookId', protect, removeFromWishList);
router.post('/toggleWishList', protect, toggleWishlist);

module.exports = router;
