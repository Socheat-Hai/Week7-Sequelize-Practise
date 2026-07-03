import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function EditBook() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookData = location.state?.book;

  const API_URL = "http://localhost:3333/api/authors";

  const [book, setBook] = useState({
    title: bookData?.title || "",
    publicationYear: bookData?.publicationYear || "",
    pages: bookData?.pages || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/books/${bookData.id}`, {
        title: book.title,
        publicationYear: Number(book.publicationYear),
        pages: Number(book.pages),
      });
      alert("Book updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      alert("Failed to update book");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Edit Book</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Publication Year</label>
          <input
            type="number"
            name="publicationYear"
            value={book.publicationYear}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Pages</label>
          <input
            type="number"
            name="pages"
            value={book.pages}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-success me-2">Update</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default EditBook;
