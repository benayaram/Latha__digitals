import React from 'react';
import EventCard from './EventCard';
import '../styles/gallery.css';

const Gallery = ({ events }) => {
  return (
    <div className="gallery">
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default Gallery;
