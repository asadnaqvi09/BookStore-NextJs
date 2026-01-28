const express = require('express');
const {getAllBooks,addBook,updateBookByID,deleteBookByID,getSingleBookByID,searchFilterBooks} = require('../controllers/booksController');
const {protect,adminOnly} = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware');
const router = express.Router();

router.get('/getAllBooks', getAllBooks);
router.post('/addBook',protect,adminOnly, upload.array('bookImages',4) ,addBook);
router.get('/searchBooks', searchFilterBooks);
router.patch('/updateBookByID/:id',protect,adminOnly,upload.array('bookImages',4) ,updateBookByID);
router.delete('/deleteBookByID/:id',protect,adminOnly, deleteBookByID);
router.get('/getSingleBookByID/:id', getSingleBookByID);

module.exports = router;