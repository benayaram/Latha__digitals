import React, { useState } from 'react';
import Admin from '../components/Admin';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);

  const handleEventCreate = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
  };

  return (
    <div>
      <Admin onEventCreate={handleEventCreate} />
      <div>
        <h2>All Events</h2>
        {events.map(event => (
          <div key={event.id}>
            <h3>{event.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
