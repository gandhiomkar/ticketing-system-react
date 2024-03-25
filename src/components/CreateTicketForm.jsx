import React, { useContext, useState } from "react";
import { UserTicketContext } from "../contexts/UserTIcketContext";

const CreateTicketForm = () => {
  const { createTicket } = useContext(UserTicketContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send file along with other data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("file", file);
    // Call the createTicket function with form data
    await createTicket(formData);

    // Clear form fields after submission
    setTitle("");
    setBody("");
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="body">Body:</label>
      <textarea
        id="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <label htmlFor="file">File:</label>
      <input type="file" id="file" onChange={handleFileChange} />

      <button type="submit">Create Ticket</button>
    </form>
  );
};

export default CreateTicketForm;
