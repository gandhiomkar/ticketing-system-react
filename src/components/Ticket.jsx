import React from "react";
import "./Ticket.css"; // Import your CSS file for styling
import "@fortawesome/fontawesome-free/js/all.js";

const Ticket = (props) => {
  // Determine which icon to display based on the isResolved prop
  const resolvedIcon = props.isResolved ? (
    <i className="fas fa-check-circle resolved-icon"></i>
  ) : (
    <i className="fas fa-exclamation-circle unresolved-icon"></i>
  );
  const baseUrl = "http://localhost:5000/uploads/";
  const handleDownloadFile = async (filePath) => {
    try {
      const response = await fetch(`${baseUrl}${props.filePath}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filePath; // Function to extract file name from file path
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  console.log(`${baseUrl}${props.filePath}`);
  return (
    <div className="Ticket">
      <img className="ticket-image" src={props.image} alt="Ticket Image" />
      <div className="Ticket-body">
        <h2>{props.title}</h2>
        <p>{props.body}</p>
        <div className="assigned-support">{props.assignedSupport}</div>
        <div className="resolved-status">{resolvedIcon}</div>
        <div>
          <strong>File:</strong>
          <a
            href={`${baseUrl}${props.filePath}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.filePath ? "View / Download File" : "No File Uploaded"}
          </a>
          {props.filePath && (
            <button onClick={() => handleDownloadFile(props.filePath)}>
              Download
            </button>
          )}
        </div>
        <div className="solution">{props.solution}</div>
        <div className="solution-file">{props.solutionFile}</div>
      </div>
    </div>
  );
};

export default Ticket;
