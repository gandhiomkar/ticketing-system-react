// TechSupportContext.js
import React, { createContext, useState, useEffect } from "react";

const TechSupportContext = createContext();

const TechSupportProvider = ({ children }) => {
  const [techSupports, setTechSupports] = useState([]);

  useEffect(() => {
    const fetchTechSupports = async () => {
      try {
        const response = await fetch("http://localhost:5000/techsupport");
        const data = await response.json();
        //console.log(data);
        setTechSupports(data);
      } catch (error) {
        console.error("Error fetching tech supports:", error);
      }
    };

    fetchTechSupports();
  }, []);

  return (
    <TechSupportContext.Provider value={{ techSupports }}>
      {children}
    </TechSupportContext.Provider>
  );
};

export { TechSupportContext, TechSupportProvider };
