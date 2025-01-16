import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../component/BackButton";
import { SERVER_URL } from "../global";

const ShowBook = () => {
  const [book, setBook] = useState(null); // Book data
  const [imageError, setImageError] = useState(false); // Track image load error
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  }, [id, token]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="container my-5">
      {/* Back Button */}
      <div className="mb-4">
        <BackButton />
      </div>

      {/* Show Book Header */}
      <h1 className="text-center mb-4">Book Details</h1>

      {/* Book Details Card */}
      {book ? (
        <div className="card shadow-sm">
          <div className="row g-0">
            {/* Book Image */}
            <div className="col-md-4">
              {book.image && !imageError ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className="img-fluid rounded-start"
                  onError={handleImageError}
                />
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100 bg-light text-muted">
                  <p>No Image Available</p>
                </div>
              )}
            </div>

            {/* Book Details */}
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>ID:</strong> {book._id}
                  </li>
                  <li className="list-group-item">
                    <strong>Author:</strong> {book.author}
                  </li>
                  <li className="list-group-item">
                    <strong>Publish Year:</strong> {book.publishYear}
                  </li>
                  <li className="list-group-item">
                    <strong>Created Time:</strong>{" "}
                    {new Date(book.createdAt).toLocaleString()}
                  </li>
                  <li className="list-group-item">
                    <strong>Last Update Time:</strong>{" "}
                    {new Date(book.updatedAt).toLocaleString()}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
