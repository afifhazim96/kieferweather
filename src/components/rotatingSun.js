import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

class RotatingSun extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.loop(Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1500
    })).start()
  }
  render() {
    const interpolateRotation = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const animatedStyle = {
      transform: [
        { rotate: interpolateRotation }
      ]
    }

    return (
      <View style={styles.container}>
        <Animated.Text style={[styles.icon, animatedStyle]}>A</Animated.Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'weather',
    color: '#fff',
    fontSize: 80
  },
  container: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default RotatingSun;
