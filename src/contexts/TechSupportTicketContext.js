// TicketContext.js
import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider";

const TechSupportTicketContext = createContext();

const TechSupportTicketProvider = ({ children }) => {
  const [Tickets, setTickets] = useState([]);
  const { user } = useAuth();
  //console.log(user.id);

  useEffect(() => {
    // Fetch tickets from the database or API endpoint
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/getticketsbyts/${user.id}`
        );
        const data = await response.json();
        //console.log("response", data);
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [user]); // Run once on component mount

  const updateTicketStatusAPI = async (ticketId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/updateticketstatus/${ticketId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.error("Error updating ticket status", e);
    }
  };

  const updateTicketStatus = (ticketId) => {
    const updatedTickets = Tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          isResolved: !ticket.isResolved,
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);

    updateTicketStatusAPI(ticketId);
  };

  const addSolution = (data) => {
    const updatedTickets = Tickets.map((ticket) => {
      ticket = JSON.parse(JSON.stringify(ticket));

      if (ticket.id == data.get("id")) {
        return {
          ...ticket,
          solution: data.get("solution"),
          solutionFile: data.get("file").name,
        };
      }
      return ticket;
    });
    console.log(updatedTickets);
    setTickets(updatedTickets);
  };

  return (
    <TechSupportTicketContext.Provider
      value={{ Tickets, updateTicketStatus, addSolution }}
    >
      {children}
    </TechSupportTicketContext.Provider>
  );
};

export { TechSupportTicketContext, TechSupportTicketProvider };
