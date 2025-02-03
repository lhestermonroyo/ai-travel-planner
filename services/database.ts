import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
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

const updateUser = async (user: any) => {
  try {
    await setDoc(
      doc(db, 'users', user.email),
      {
        ...user,
        updatedAt: new Date(),
      },
      { merge: true }
    );
  } catch (error) {
    console.log('updateUser [error]', error);
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
const saveTrip = async (email: string, tripDetails: any, aiGenTrip: any) => {
  try {
    const date = new Date();
    const createdAt = date.toISOString();

    const docRef = await addDoc(collection(db, 'trips'), {
      email,
      tripDetails,
      aiGenTrip,
      ratings: null,
      createdAt,
    });

    if (docRef) {
      return await getDoc(doc(db, 'trips', docRef.id));
    }
  } catch (error) {
    console.log('saveTrip [error]', error);
    throw error;
  }
};

const getTripsByEmail = async (email: string) => {
  try {
    const q = query(
      collection(db, 'trips'),
      where('email', '==', email),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  } catch (error) {
    console.log('getTrips [error]', error);
    throw error;
  }
};

export default {
  saveUser,
  updateUser,
  getUser,
  saveTrip,
  getTripsByEmail,
};
