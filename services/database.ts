import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

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

export default {
  saveUser,
  getUser,
};
