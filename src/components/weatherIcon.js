import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const WeatherIcon = ({children, small, dark}) => {
  // Input from OpenWeatherMap to WeatherFont

  let icon = 'B';
  switch (children) {
    case '01d':
      icon = 'A';
      break;
    case '01n':
      icon = 'I';
      break;
    case '02d':
      icon = 'D';
      break;
    case '02n':
      icon = 'J';
      break;
    case '03d':
      icon = 'C';
      break;
    case '03n':
      icon = 'J';
      break;
    case '04d':
      icon = 'O';
      break;
    case '04n':
      icon = 'O';
      break;
    case '09d':
      icon = 'F';
      break;
    case '09n':
      icon = 'K';
      break;
    case '10d':
      icon = 'S';
      break;
    case '10n':
      icon = 'S';
      break;
    case '11d':
      icon = 'U';
      break;
    case '11n':
      icon = 'V';
      break;
    case '13d':
      icon = 'W';
      break;
    case '13n':
      icon = 'W';
      break;
    case '50d':
      icon = 'N';
      break;
    case '50n':
      icon = 'N';
      break;
    default:
      icon = children;
    }
    return (
      <View style={[styles.view, { height: small ? 50 : 170 }]}>
        <Text style={[styles.text, { fontSize: small ? 30 : 150, color: dark ? '#333' : '#fff' }]}>&nbsp;{icon}&nbsp;</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'weather',
    fontSize: 150,
    color: '#fff',
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 170
  }
});

export default WeatherIcon;
