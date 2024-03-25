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
        console.log("response", data);
        setUserTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [user]); // Run once on component mount

  return (
    <UserTicketContext.Provider value={{ userTickets }}>
      {children}
    </UserTicketContext.Provider>
  );
};

export { UserTicketContext, UserTicketProvider };
