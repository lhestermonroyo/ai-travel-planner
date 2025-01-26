import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextI

const Login = () => {
  return (
    <View style={styles.container}>
      <H3>Login</H3>
      <View>
        <Label>Email</Label>
        <Input placeholder="Email" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    // space between children
    display: 'flex',
    backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  formControl: {},
});

export default Login;
