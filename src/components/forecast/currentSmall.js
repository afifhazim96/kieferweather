import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WeatherIcon from '../weatherIcon';
import BackBtn from '../backBtn';

export default CurrentSmall = ({ weatherData }) => (
  <View style={styles.container}>
    <BackBtn />
    <View style={styles.textView}>
      <Text style={styles.placeText}>
        {weatherData.name}
      </Text>
      <Text style={styles.weatherText}>{weatherData.weather[0].description}</Text>
    </View>
    <WeatherIcon dark small>{weatherData.weather[0].icon}</WeatherIcon>
    <Text style={styles.tempText}>{weatherData.main.temp}°</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  weatherText: {
    fontSize: 12,
    color: '#333',
    marginTop: 0
  },
  placeText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'arvo',
    marginTop: 10
  },
  tempText: {
    color: '#333',
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'archivo',
    marginBottom: 10
  },
  textView: {
    flexDirection: 'column',
  }
});
