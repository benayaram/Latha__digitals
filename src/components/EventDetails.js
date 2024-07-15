import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventByTitle } from '../indexedDB';
import '../styles/eventdetails.css';

const EventDetails = () => {
  const { title } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const fetchedEvent = await getEventByTitle(title);
      setEvent(fetchedEvent);
    };

    fetchEvent();
  }, [title]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-details">
      <h1>{event.title}</h1>
      <img src={event.thumbnail} alt={event.title} className="event-thumbnail" />
      <div className="event-images">
        {event.images.map((image, index) => (
          <img key={index} src={image} alt={`Event ${event.title} Image ${index + 1}`} className="event-image" />
        ))}
      </div>
    </div>
  );
};

export default EventDetails;
