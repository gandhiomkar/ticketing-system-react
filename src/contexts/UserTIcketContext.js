// UserTicketContext.js
import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider";

const UserTicketContext = createContext();

const UserTicketProvider = ({ children }) => {
  const [userTickets, setUserTickets] = useState([]);
  const { user } = useAuth();
  //console.log(user.id);

  useEffect(() => {
    // Fetch tickets from the database or API endpoint
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/gettickets/${user.id}`
        );
        const data = await response.json();
        //console.log("response", data);
        setUserTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [user]); // Run once on component mount

  // Function to create a new ticket
  const createTicket = async (formData) => {
    formData.append("userId", user.id);
    try {
      const response = await fetch("http://localhost:5000/createTicket", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }

      const data = await response.json();
      console.log(data);
      // Update context state with the new ticket data
      setUserTickets([...userTickets, data]);
      console.log("usertickets:", userTickets);
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <UserTicketContext.Provider value={{ userTickets, createTicket }}>
      {children}
    </UserTicketContext.Provider>
  );
};

export { UserTicketContext, UserTicketProvider };
