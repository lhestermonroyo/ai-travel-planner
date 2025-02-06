import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useRecoilState } from 'recoil';

import { auth as firebaseAuth } from '@/services/firebase';
import services from '@/services';
import states from '@/states';

import LandingIntro from '../components/LandingIntro';
import Loading from '@/components/Loading';

const Index = () => {
  const [auth, setAuth] = useRecoilState(states.auth);
  const { isAuth } = auth;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      onAuthStateChangedHandler
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const onAuthStateChangedHandler = async (user: any) => {
    try {
      if (user && user.emailVerified) {
        const userDetails = await services.database.getUser(user.email);

        setAuth({
          isAuth: !!user?.uid,
          user: {
            email: user?.email,
            uid: user?.uid,
            ...userDetails,
          },
        });
      } else {
        setAuth({
          isAuth: false,
          user: null,
        });
      }
    } catch (error) {
      console.log('Error checking auth state:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      {isAuth ? <Redirect href="/(tabs)/MyTrips" /> : <LandingIntro />}
    </Fragment>
  );
};

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

export default Index;
