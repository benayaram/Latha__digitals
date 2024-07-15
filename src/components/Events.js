import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/eventcard.css';

const Events = ({ events }) => {
  useEffect(() => {
    // You can use this effect to perform any additional actions if needed
  }, [events]);

  return (
    <div className="events">
      <h1>Events</h1>
      <div className="events-grid">
        {events.map(event => (
          <Link to={`/event/${event.title}`} key={event.title} className="event-card">
            <img src={event.thumbnail} alt={event.title} />
            <h2>{event.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Events;
