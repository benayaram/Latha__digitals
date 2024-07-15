import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Admin from './components/Admin';
import Events from './components/Events';
import EventDetails from './components/EventDetails';
import './styles/App.css'; // Adjust the path if needed
import { getAllEvents } from './indexedDB';

const App = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const events = await getAllEvents();
    setEvents(events);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const onEventCreate = async (newEvent) => {
    await fetchEvents(); // Refresh events after a new one is added
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin onEventCreate={onEventCreate} />} />
          <Route path="/events" element={<Events events={events} />} />
          <Route path="/event/:title" element={<EventDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
