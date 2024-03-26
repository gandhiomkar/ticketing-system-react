import React, { useState } from "react";

const SolutionForm = ({ id, onSubmit, onClose }) => {
  const [solution, setSolution] = useState("");
  const [file, setFile] = useState(null);

  const handleSolutionChange = (e) => {
    setSolution(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a FormData object to send file along with other data
    const formData = new FormData();
    formData.append("id", id);
    formData.append("solution", solution);
    formData.append("file", file);
    // Submit the form data
    onSubmit(formData);
    // Close the popup form
    setSolution("");
    setFile(null);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Solution</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="solution">Solution:</label>
          <textarea
            id="solution"
            value={solution}
            onChange={handleSolutionChange}
          />

          <label htmlFor="file">Upload File:</label>
          <input type="file" id="file" onChange={handleFileChange} />

          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            close
          </button>
        </form>
      </div>
    </div>
  );
};

export default SolutionForm;
