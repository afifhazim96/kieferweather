import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default Tile = ({ dark, children }) => (
  <Animatable.View
    style={[styles.view, { backgroundColor: dark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)' }]}
    animation="fadeInUp"
  >
    {children}
  </Animatable.View>
);

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  }
})
