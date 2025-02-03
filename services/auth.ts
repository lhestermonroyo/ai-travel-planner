import {
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
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

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  try {
    const user = auth().currentUser;
    const credentials = auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    );

    await reauthenticateWithCredential(auth.currentUser, credentials).then(
      res => {
        console.log('Reauthenticated!', res);
      }
    );
  } catch (error) {
    console.log('changePassword [error]', error);
    throw error;
  }
};

export default {
  signUp,
  logIn,
  changePassword,
  emailVerification,
};
