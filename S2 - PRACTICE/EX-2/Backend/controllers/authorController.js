const Author = require('../models/Author');
const Book = require('../models/Book');

// List all authors along with their books (include)
// Endpoint: GET /api/authors
listAllAuthorsWithBooks = async (req, res) => {
  try {
    const authors = await Author.findAll({ include: [{ model: Book }] });
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all books by a given author name
// Endpoint: GET /api/authors/books-search?name=Kim Ang
getBooksByAuthor = async (req, res) => {
  try {
    const author = await Author.findOne({ where: { name: req.query.name } });
    if (!author) return res.status(404).json({ error: 'Author not found' });

    const books = await author.getBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new book for an existing author using .createBook()
// Endpoint: POST /api/authors/:authorId/books
addBookToAuthor = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.authorId);
    if (!author) return res.status(404).json({ error: 'Author not found' });

    const newBook = await author.createBook({
      title: req.body.title,
      publicationYear: req.body.publicationYear,
      pages: req.body.pages
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all books in the system
// Endpoint: GET /api/authors/books
getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({ include: [{ model: Author, attributes: ['name'] }] });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book's details
// Endpoint: PUT /api/authors/books/:id
updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    await book.update(req.body);
    res.json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a book from the system
// Endpoint: DELETE /api/authors/books/:id
deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {listAllAuthorsWithBooks, getBooksByAuthor, addBookToAuthor, getAllBooks, updateBook, deleteBook};