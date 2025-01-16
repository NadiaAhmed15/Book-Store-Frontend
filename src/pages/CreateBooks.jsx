import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../global";
import BackButton from "../component/BackButton";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [base64Image, setBase64Image] = useState("");
  const [title, setTitle] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  const handleSubmit = () => {
    const data = {
      title,
      author,
      publishYear,
      image: base64Image,
    };
    axios
      .post(`${SERVER_URL}/book`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        enqueueSnackbar("Book created successfully", { variant: "success" });
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to create book", { variant: "error" });
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container my-5">
      <BackButton />
      <h1 className="text-center mb-4">Create Book</h1>
      <div className="card shadow p-4">
        <form>
          <div className="mb-3 form-group">
            <label htmlFor="title" className="form-label fw-bold">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Enter book title"
            />
          </div>
          <div className="mb-3 form-group">
            <label htmlFor="author" className="form-label fw-bold">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="form-control"
              placeholder="Enter author name"
            />
          </div>
          <div className="mb-3 form-group">
            <label htmlFor="publishYear" className="form-label fw-bold">
              Publish Year
            </label>
            <input
              type="number"
              id="publishYear"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="form-control"
              placeholder="Enter publish year"
            />
          </div>
          <div className="mb-3 form-group">
            <label htmlFor="image" className="form-label fw-bold">
              Image
            </label>
            <input
              type="file"
              id="image"
              className="form-control"
              onChange={handleFileUpload}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBooks;
