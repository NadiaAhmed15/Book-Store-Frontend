import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BookTable from "../component/BookTable";
import { SERVER_URL } from "../global";

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const usernameLocal = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // Redirect to login if user is not authenticated
  if (!usernameLocal) {
    navigate("/");
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/book`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch books:", error);
      });
  }, [token]);

  return (
    <div className="container my-5">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded shadow-sm mb-4">
        <div className="container-fluid">
          <h1 className="navbar-brand mb-0">Book Management</h1>
          <div className="d-flex align-items-center">
            <span className="me-3 text-muted">Welcome, {usernameLocal}!</span>
            <button className="btn btn-outline-primary" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </nav>

      {/* Book List Section */}
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="card-title mb-0">Book List</h2>
          <Link to="/book/create" className="btn btn-success">
            <MdOutlineAddBox className="me-2" size={20} />
            Add Book
          </Link>
        </div>
        <div className="card-body">
          {/* Book Table */}
          <BookTable books={books} />
        </div>
      </div>
    </div>
  );
};

export default Home;
