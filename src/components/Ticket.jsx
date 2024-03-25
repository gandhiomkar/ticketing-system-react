import React from "react";
import "./Ticket.css"; // Import your CSS file for styling

const Ticket = (props) => {
  // Determine which icon to display based on the isResolved prop
  const resolvedIcon = props.isResolved ? (
    <i className="fas fa-check-circle resolved-icon"></i>
  ) : (
    <i className="fas fa-exclamation-circle unresolved-icon"></i>
  );

  return (
    <div className="Ticket">
      <img className="ticket-image" src={props.image} alt="Ticket Image" />
      <div className="Ticket-body">
        <h2>{props.title}</h2>
        <p>{props.body}</p>
        <div className="assigned-support">{props.assignedSupport}</div>
        <div className="resolved-status">{resolvedIcon}</div>
      </div>
    </div>
  );
};

export default Ticket;
