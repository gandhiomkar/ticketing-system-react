import React from "react";
import { Outlet, Link } from "react-router-dom";
import Ticket from "../../components/Ticket";
import TicketForm from "../../components/TicketForm";
import { useAuth } from "../../hooks/AuthProvider";

const Dash = () => {
  const auth = useAuth();
  const cardData = [
    {
      title: "Card 1 Title",
      body: "Body text for Card 1",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Card 2 Title",
      body: "Body text for Card 2",
      image: "https://via.placeholder.com/300",
    },
    // Add more card data as needed
  ];
  return (
    <div>
      <div>
        <h1>Welcome! {auth.user?.email}</h1>
        <button onClick={() => auth.logOut()} className="btn-submit">
          logout
        </button>
      </div>
      <div>
        <Link to={"/createticket"}>
          <button class="btn-primary"> create </button>
        </Link>
      </div>
      <div className="ticket-list">
        {cardData.map((card, index) => (
          <Ticket
            key={index}
            title={card.title}
            body={card.body}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Dash;
