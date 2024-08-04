import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";


export const getItems = async (userId) => {
  try {
    
    const itemsRef = collection(db, "users", userId, "items");
    
    
    const q = query(itemsRef);
    
   
    const querySnapshot = await getDocs(q);
    
   
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return items;
  } catch (error) {
    console.error("Error getting items: ", error);
    throw new Error("Failed to fetch items.");
  }
};


export const addItem = async (userId, item) => {
  try {
    
    const itemsRef = collection(db, "users", userId, "items");
    
   
    const docRef = await addDoc(itemsRef, item);
    
    
    return docRef.id;
  } catch (error) {
    console.error("Error adding item: ", error);
    throw new Error("Failed to add item.");
  }
};
