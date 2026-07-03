import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddBook() {
  const { authorId } = useParams();
  const navigate = useNavigate();
  const API_URL = "http://localhost:3333/api/authors";

  const [authorName, setAuthorName] = useState("");
  const [book, setBook] = useState({
    title: "",
    publicationYear: "",
    pages: "",
  });

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(API_URL);
        const authors = response.data;
        const author = authors.find((a) => a.id === Number(authorId));
        if (author) setAuthorName(author.name);
      } catch (error) {
        console.error("Error loading author:", error);
      }
    };
    getAuthor();
  }, [authorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/${authorId}/books`, {
        title: book.title,
        publicationYear: Number(book.publicationYear),
        pages: Number(book.pages),
      });
      alert("Book added successfully");
      navigate("/");
    } catch (error) {
      console.error("Create error:", error.response?.data || error.message);
      alert("Failed to add book");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Add Book {authorName ? `for ${authorName}` : ""}</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-success me-2">Save</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default AddBook;
