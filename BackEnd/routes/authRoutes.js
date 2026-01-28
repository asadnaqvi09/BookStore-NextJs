const express = require('express');
const router = express.Router();
const {registerUser,LoginUser, LogoutUser, getMe} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register',registerUser);
router.post('/login', LoginUser);
router.post('/logout', LogoutUser);
router.get('/me', protect, getMe);
module.exports = router;