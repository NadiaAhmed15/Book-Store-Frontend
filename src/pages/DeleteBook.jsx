import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { SERVER_URL } from "../global";
import BackButton from "../component/BackButton";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  const handleDeleteBook = () => {
    // Confirm deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) {
      return; // Exit if the user cancels
    }

    axios
      .delete(`${SERVER_URL}/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate("/home"); // Redirect to the home page after deletion
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(
          "An error occurred while deleting the book. Please try again.",
          { variant: "error" }
        );
      });
  };

  return (
    <div className="container my-5">
      <BackButton />
      <h1 className="text-center mb-4 text-danger">Delete Book</h1>
      <div className="card shadow-lg border-danger rounded p-5">
        <div className="card-body text-center">
          <h5 className="card-title text-dark mb-4">
            Are you sure you want to delete this book?
          </h5>
          <p className="text-muted mb-4">
            This action cannot be undone. Please confirm your decision.
          </p>
          <button
            className="btn btn-danger btn-lg"
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
