import { useState, useEffect } from "react";
import BackButton from "../component/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../global";
import { useSnackbar } from "notistack";
import React from "react";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("Failed to fetch book details", { variant: "error" });
      });
  }, [id, token, enqueueSnackbar]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };

    axios
      .put(`${SERVER_URL}/book/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        enqueueSnackbar("Book updated successfully", { variant: "success" });
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("Failed to update book. Please try again.", { variant: "error" });
      });
  };

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="mb-3">
        <BackButton />
      </div>

      {/* Card for Edit Book Form */}
      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="text-center mb-4">Edit Book</h1>
          <form>
            {/* Title Field */}
            <div className="mb-3 row">
              <label htmlFor="title" className="col-sm-2 col-form-label text-end fw-bold">
                Title
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  placeholder="Enter book title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Author Field */}
            <div className="mb-3 row">
              <label htmlFor="author" className="col-sm-2 col-form-label text-end fw-bold">
                Author
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="author"
                  className="form-control"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
            </div>

            {/* Publish Year Field */}
            <div className="mb-3 row">
              <label htmlFor="publishYear" className="col-sm-2 col-form-label text-end fw-bold">
                Publish Year
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  id="publishYear"
                  className="form-control"
                  placeholder="Enter publish year"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="row">
              <div className="col-sm-10 offset-sm-2">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleEditBook}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
