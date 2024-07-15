import React, { useState, useEffect } from 'react';
import { addEvent, deleteEvent, getAllEvents } from '../indexedDB';
import '../styles/admin.css';

const Admin = ({ onEventCreate }) => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [images, setImages] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const events = await getAllEvents();
    setEvents(events);
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(files.map(fileToBase64));
    setImages(base64Images);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      thumbnail,
      images,
    };

    // Store event in IndexedDB
    await addEvent(newEvent);

    onEventCreate(newEvent); // Notify parent component about the new event
    fetchEvents(); // Refresh events
    setTitle('');
    setThumbnail('');
    setImages([]);
  };

  const handleDelete = async (eventTitle) => {
    await deleteEvent(eventTitle);
    fetchEvents(); // Refresh events after deletion
  };

  return (
    <div className="admin-panel">
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
          required
        />
        <input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="Thumbnail URL"
          required
        />
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Create Event</button>
      </form>

      <h2>Manage Events</h2>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event.title} className="event-item">
            <img src={event.thumbnail} alt={event.title} className="event-thumbnail" />
            <span>{event.title}</span>
            <button onClick={() => handleDelete(event.title)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;