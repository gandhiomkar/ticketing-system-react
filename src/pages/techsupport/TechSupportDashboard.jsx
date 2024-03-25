import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Ticket from "../../components/Ticket";
import TicketForm from "../../components/TicketForm";
import { useAuth } from "../../hooks/AuthProvider";
import { AdminTicketContext } from "../../contexts/AdminTicketContext";
import TechSupportTicket from "../../components/TechSupportTicket";

const TechSupportDash = () => {
  const auth = useAuth();

  const { tickets, updateTicketStatus } = useContext(AdminTicketContext);

  const [currentState, setCurrentState] = useState(tickets);
  //console.log("current state:", currentState);

  useEffect(() => {
    setCurrentState(tickets);
  }, [tickets]);

  return (
    <div>
      <div>
        <h1>Welcome! {auth.user?.email}</h1>
        <button onClick={() => auth.logOut()} className="btn-submit">
          logout
        </button>
      </div>
      <div className="ticket-list-wrapper">
        <div className="ticket-list">
          {currentState.map((card, index) => (
            <TechSupportTicket
              key={index}
              id={card.id}
              title={card.title}
              body={card.body}
              image={card.image}
              assignedSupport={card.assignedSupport}
              isResolved={card.isResolved}
              onToggle={updateTicketStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechSupportDash;
