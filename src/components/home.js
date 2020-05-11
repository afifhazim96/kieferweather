import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import CurrentLocation from './home/currentLocation';
import Tile from './tile';

export default Home = () => (
  <View style={styles.container}>
    <CurrentLocation />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    opacity: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 100
  }
})
