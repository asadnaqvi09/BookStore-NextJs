const express = require('express');
const { createContact, getContacts, deleteContact } = require('../controllers/contactController');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-contact', createContact);
router.get('/get-contacts',protect, getContacts);
router.delete('/delete-contact/:id',protect, deleteContact);

module.exports = router;