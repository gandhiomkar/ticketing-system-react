// AdminTicketContext.js
import React, { createContext, useState, useEffect } from "react";

const AdminTicketContext = createContext();

const AdminTicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch tickets from the database or API endpoint
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:5000/gettickets");
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []); // Run once on component mount

  const updateTicketTechSupportAPI = async (ticketId, techSupport) => {
    try {
      const response = await fetch(
        `http://localhost:5000/updatetechsupport/${ticketId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ techSupport }),
        }
      );
      const data = await response.json();
      console.log("Updated ticket:", data);
    } catch (error) {
      console.error("Error updating ticket tech support:", error);
    }
  };

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

  const updateTicketTechSupport = (ticketId, techSupport) => {
    // Find the ticket with the given ticketId in the tickets array
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          assignedSupportId: techSupport.id, // Update the techSupportId for the ticket
          assignedSupport: techSupport.email,
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    //console.log(tickets);
    // Send API request to update ticket's assigned tech support in the backend
    updateTicketTechSupportAPI(ticketId, techSupport);
  };

  const updateTicketStatus = (ticketId) => {
    const updatedTickets = tickets.map((ticket) => {
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

  const deleteTicketAPI = (ticketId) => {
    fetch(`http://localhost:5000/tickets/${ticketId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete ticket");
        }
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket.id !== ticketId)
        );
        // Handle success message or any other logic after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting ticket:", error);
        // Handle error message or any other error handling logic
      });
  };
  const handleDeleteTicket = (ticketId) => {
    deleteTicketAPI(ticketId);
  };
  return (
    <AdminTicketContext.Provider
      value={{
        tickets,
        updateTicketTechSupport,
        updateTicketStatus,
        handleDeleteTicket,
      }}
    >
      {children}
    </AdminTicketContext.Provider>
  );
};

export { AdminTicketContext, AdminTicketProvider };
