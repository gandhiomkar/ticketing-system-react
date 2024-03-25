import React from "react";
import Ticket from "./Ticket";

const TechSupportTicket = (props) => {
  const handleToggle = () => {
    props.onToggle(props.id);
  };
  return (
    <div>
      <div>
        <Ticket {...props} />
      </div>
      <div>
        <button onClick={handleToggle}>
          {props.isResolved ? "Mark as Unresolved" : "Mark as Resolved"}
        </button>
      </div>
    </div>
  );
};

export default TechSupportTicket;
