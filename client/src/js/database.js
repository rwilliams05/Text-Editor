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
//export const putDb = async (content) => console.error('putDb not implemented');
// Export a function we will use to POST to the database.
export const putDb = async (content) => {
  console.log('Update database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .put() method on the store and pass in the content.
  const request = store.put({ jate: content, id:1 });

  // Get confirmation of the request.
  const result = await request;
  console.log('data saved to the database', result);
  return result?.value
};
initdb();


// Export a function we will use to GET all from the database.
//export const getDb = async () => console.error('getDb not implemented');

export const getDb = async () => {
  console.log('GET all from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .get() method to get all data in the database.
  const request = store.get(1);

   // Get confirmation of the request.
  const result = await request;
  console.log('data saved', result);
  return result;
};

initdb();
