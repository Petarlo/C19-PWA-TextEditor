import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Connect to the database database + version we want to use.
  const contactDb = await openDB('jate', 1);
  // New transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jate', 'readwrite');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use .add() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });
  // Confirmation of request
  const result = await request;
  console.log('Data saved to the database', result);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Connect to the database database + version we want to use.
  const contactDb = await openDB('jate', 1);
  // New transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jate', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Get all request
  const request = store.getAll();
  // Confirmation of request
  const result = await request;
  console.log('result.value', result);
  return result.value;
};

initdb();
