import React, { useContext, useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Ticket from "../../components/Ticket";
import TicketForm from "../../components/CreateTicketForm";
import { useAuth } from "../../hooks/AuthProvider";
import { AdminTicketContext } from "../../contexts/AdminTicketContext";
import { TechSupportContext } from "../../contexts/TechSupportContext";

const AdminDash = () => {
  const auth = useAuth();

  const { tickets, updateTicketTechSupport, handleDeleteTicket } =
    useContext(AdminTicketContext);
  //console.log(tickets);
  const { techSupports } = useContext(TechSupportContext);

  const handleChangeTechSupport = (ticketId, techSupport) => {
    // Call the update function from TicketContext to change the assigned tech support

    updateTicketTechSupport(ticketId, techSupport);
  };

  const [currentState, setCurrentState] = useState(tickets);
  console.log("current state:", currentState);

  useEffect(() => {
    setCurrentState(tickets);
  }, [tickets]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>All Tickets</h2>
      <ul>
        {currentState.map((ticket) => (
          <li key={ticket.id}>
            ticketid: {ticket.id}, title: {ticket.title},current_ts:
            {ticket.assignedSupport}
            <select
              onChange={(e) =>
                handleChangeTechSupport(ticket.id, JSON.parse(e.target.value))
              }
            >
              <option value="">Select Tech Support</option>
              {techSupports.map((techSupport) => (
                <option
                  key={techSupport.id}
                  value={JSON.stringify({
                    id: techSupport.id,
                    email: techSupport.email,
                  })}
                >
                  {techSupport.email}
                </option>
              ))}
            </select>
            <button onClick={() => handleDeleteTicket(ticket.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDash;
