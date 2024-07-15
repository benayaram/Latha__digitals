import { openDB } from 'idb';

const DB_NAME = 'latha-digitals-db';
const STORE_NAME = 'events';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'title' });
      }
    },
  });
};

export const addEvent = async (event) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.objectStore(STORE_NAME).add(event);
  await tx.done;
};

export const getAllEvents = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const events = await tx.objectStore(STORE_NAME).getAll();
  await tx.done;
  return events;
};

export const deleteEvent = async (eventTitle) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.objectStore(STORE_NAME).delete(eventTitle);
  await tx.done;
};

export const getEventByTitle = async (title) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const event = await tx.objectStore(STORE_NAME).get(title);
  await tx.done;
  return event;
};
