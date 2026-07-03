import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3333/api/authors";

  const getAuthors = async () => {
    try {
      const response = await axios.get(API_URL);
      setAuthors(response.data);
    } catch (error) {
      console.error("Error loading authors:", error.response?.data || error.message);
      alert("Failed to load authors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await axios.delete(`${API_URL}/books/${bookId}`);
      getAuthors();
      alert("Book deleted successfully");
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      alert("Failed to delete book");
    }
  };

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading authors...</h2>;
  }

  return (
    <div className="container mt-4">
      <h1>Authors & Books</h1>

      {authors.length === 0 ? (
        <p>No authors found.</p>
      ) : (
        authors.map((author) => (
          <div key={author.id} className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="mb-0">{author.name} (b. {author.birthYear})</h3>
              <Link to={`/authors/${author.id}/books/add`} className="btn btn-success btn-sm">
                + Add Book
              </Link>
            </div>
            <div className="card-body">
              {(!author.Books || author.Books.length === 0) ? (
                <p className="text-muted mb-0">No books yet.</p>
              ) : (
                <table className="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Year</th>
                      <th>Pages</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {author.Books.map((book) => (
                      <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.publicationYear}</td>
                        <td>{book.pages}</td>
                        <td>
                          <Link
                            to={`/books/${book.id}/edit`}
                            state={{ book }}
                            className="btn btn-primary btn-sm me-2"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AuthorList;
