import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Ticket from "../../components/Ticket";
import TicketForm from "../../components/CreateTicketForm";
import { useAuth } from "../../hooks/AuthProvider";
import TechSupportTicket from "../../components/TechSupportTicket";
import { TechSupportTicketContext } from "../../contexts/TechSupportTicketContext";

const TechSupportDash = () => {
  const auth = useAuth();

  const { Tickets, updateTicketStatus, addSolution } = useContext(
    TechSupportTicketContext
  );

  const [currentState, setCurrentState] = useState(Tickets);
  //console.log("current state:", currentState);

  useEffect(() => {
    setCurrentState(Tickets);
  }, [Tickets]);

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
              filePath={card.filePath}
              assignedSupport={card.assignedSupport}
              isResolved={card.isResolved}
              solution={card.solution}
              solutionFile={card.solutionFile}
              onToggle={updateTicketStatus}
              addSolution={addSolution}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechSupportDash;
