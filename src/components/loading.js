import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Loading = () => {
  return (
    <Animatable.View animation="pulse" iterationCount="infinite" style={styles.view}>
      <Text style={styles.text}>A</Text>
      <Text style={styles.loadingText}>Loading</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'weather',
    fontSize: 100
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'arvo'
  }
});

export default Loading;
