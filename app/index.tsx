import React, { Fragment } from 'react';
import { Redirect } from 'expo-router';
import { RecoilRoot, useRecoilValue } from 'recoil';
import states from '@/states';
import LandingIntro from '../components/LandingIntro';

const Index = () => {
  return (
    <RecoilRoot>
      <RootContainer />
    </RecoilRoot>
  );
};

const RootContainer = () => {
  const auth = useRecoilValue(states.auth);
  const { isAuth } = auth;

  return (
    <Fragment>
      {isAuth ? <Redirect href="/(tabs)/MyTrips" /> : <LandingIntro />}
    </Fragment>
  );
};

export default Index;
