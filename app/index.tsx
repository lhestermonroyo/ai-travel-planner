import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useRecoilState } from 'recoil';

import { auth as firebaseAuth } from '@/services/firebase';
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

  const onAuthStateChangedHandler = (user: any) => {
    try {
      console.log('auth user:', user);
      if (user && user.emailVerified) {
        setAuth({
          isAuth: true,
          user: user,
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

export default Index;
