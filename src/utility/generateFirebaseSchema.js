import {dataBase} from "./firebaseApp";
import {collection,getDocs} from "firebase/firestore";

export const generateSchema = async (collectionName,setState) => {
  const collectionRef = collection(dataBase, collectionName);
  const snapshot = await getDocs(collectionRef);

  const schema = {};

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const type = Array.isArray(value)
        ? "array"
        : value === null
        ? "null"
        : typeof value;
      schema[key] = type; // Egyedi mezőnév és típus tárolása
    });
  });

  console.log("Schema:", schema);
  setState(schema)
};
