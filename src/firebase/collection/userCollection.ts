import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const userCollection = collection(db, 'User');

export const addUserData = async (data: any) => {
  try {
    const timestamp = serverTimestamp();
    const userDataWithTimestamp = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const docRef = await addDoc(userCollection, userDataWithTimestamp);

    await updateDoc(docRef, { id: docRef.id });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
