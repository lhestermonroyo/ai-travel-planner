import { Redirect } from 'expo-router';
import React, { Fragment, useState } from 'react';
import LandingIntro from '../components/LandingIntro';

const Index = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Fragment>
      {isAuth ? <Redirect href="/(tabs)/MyTrips" /> : <LandingIntro />}
    </Fragment>
  );
};

export default Index;
