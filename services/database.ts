import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// USER DATABASE
const saveUser = async (user: any) => {
  try {
    await setDoc(doc(db, 'users', user.email), {
      ...user,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log('saveUser [error]', error);
    throw error;
  }
};

const getUser = async (email: string) => {
  try {
    const docRef = doc(db, 'users', email);
    const response = (await getDoc(docRef)).data();

    return response;
  } catch (error) {
    console.log('getUser [error]', error);
    throw error;
  }
};

// TRIPS DATABASE

const getTrips = async (email: string) => {
  try {
    const docRef = doc(db, 'trips', email);
    const response = (await getDoc(docRef)).data();

    return response;
  } catch (error) {
    console.log('getTrips [error]', error);
    throw error;
  }
};

export default {
  saveUser,
  getUser,
  getTrips,
};
