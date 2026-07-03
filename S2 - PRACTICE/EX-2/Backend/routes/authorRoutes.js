const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Author & Relationship Routes
router.get('/', authorController.listAllAuthorsWithBooks);
router.get('/books-search', authorController.getBooksByAuthor);
router.post('/:authorId/books', authorController.addBookToAuthor);

// Direct Book Routes 
router.get('/books', authorController.getAllBooks);
router.put('/books/:id', authorController.updateBook);
router.delete('/books/:id', authorController.deleteBook);

module.exports = router;