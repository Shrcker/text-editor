import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.info("storing data into DB");

  const database = await openDB("jate", 1);
  const transaction = db.transaction("jate", "readwrite");
  const store = transaction.objectStore("jate");
  const response = await store.add({ value: content });
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.info("getting data from DB");

  const database = await openDB("jate", 1);
  const transaction = db.transaction("jate", "readwrite");
  const store = transaction.objectStore("jate");

  const response = await store.getAll();
  console.info("response.value", response);
  return response;
};

initdb();
