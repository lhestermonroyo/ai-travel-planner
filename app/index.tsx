import { Redirect } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Login from './Login';

const Index = () => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <View>{isAuth ? <Redirect href="/(tabs)/MyTrips" /> : <Login />}</View>
  );
};

export default Index;
