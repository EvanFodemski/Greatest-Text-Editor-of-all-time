
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
  const todosDb = await openDB ("jate" , 1);
  const tx = todosDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({id:1 , value: content})
  const getResult = await request;
  console.log('Data has been saved' , getResult.value)


}




// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const todosDb = await openDB('jate', 1);
  const tx = todosDb.transaction('jate' , 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const getResult = await request;
  if (getResult) {
    console.log('Data Found', getResult.value)
    return getResult.value
  } else {
    console.log('Data Not found')
  }
  
}

initdb();
