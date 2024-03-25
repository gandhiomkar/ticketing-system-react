import React from "react";

const Ticket = (props) => {
  return (
    <div className="Ticket">
      <img src={props.image} alt="Ticket Image" />
      <div className="Ticket-body">
        <h2>{props.title}</h2>
        <p>{props.body}</p>
        <p>{props.assignedSupport}</p>
        <p>{props.isResolved}</p>
      </div>
    </div>
  );
};

export default Ticket;
