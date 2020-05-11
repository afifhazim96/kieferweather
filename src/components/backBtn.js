import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

export default BackBtn = () => (
  <TouchableOpacity style={styles.container} onPress={() => Actions.pop()}>
    <AntDesign name="arrowleft" size={18} color="#333" />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
})
