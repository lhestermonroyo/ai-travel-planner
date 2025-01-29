import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase';

const signUp = async (email: string, password: string) => {
  try {
    const userCreds = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCreds.user;
    await emailVerification(user);

    console.log('[signUp] user', user);
    return user;
  } catch (error) {
    throw error;
  }
};

const logIn = async (email: string, password: string) => {
  try {
    const userCreds = await signInWithEmailAndPassword(auth, email, password);
    const user = userCreds.user;

    return user;
  } catch (error) {
    throw error;
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const emailVerification = async (user: any) => {
  try {
    await sendEmailVerification(user).then(() => {
      console.log('Email verification sent!');
    });
  } catch (error) {
    console.log('emailVerification [error]', error);
    throw error;
  }
};

export default {
  signUp,
  logIn,
  logOut,
  emailVerification,
};
