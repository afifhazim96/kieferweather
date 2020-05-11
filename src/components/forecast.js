import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import CurrentLocation from './home/currentLocation';
import CurrentSmall from './forecast/currentSmall';
import SingleForecast from './forecast/singleForecast';
import Tile from './tile';

class Forecast extends Component {

  renderForecast = (weatherData, location) => {
    const forecast = [];
    let x = 1;
    for (let i = 300; i < 1801; i = i + 300) {
      const nextDate = this.getNextDate(x);
      const dateString = nextDate.dateString;
      const dayString = nextDate.dayString;
      x++;
      forecast.push(
        <SingleForecast
          date={dateString}
          day={dayString}
          delay={i}
          key={i}
          temp={weatherData.main.temp}
          weatherData={weatherData}
        />
      );
    }
    return forecast;
  }

  getNextDate = (i) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + i);
    const currDate = ('0' + tomorrow.getDate()).slice(-2);
    const currMonth = ('0' + (tomorrow.getMonth() + 1)).slice(-2); //Months are zero based
    const currYear = tomorrow.getFullYear();
    const dateString = `${currDate}.${currMonth}.${currYear}`;

    const weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    const dayString = weekday[tomorrow.getDay()];
    console.log(dayString);
    return { dateString, dayString };
  }

  render() {
    const { weatherData, location } = this.props;
    return (
      <View style={styles.container}>
        <Tile>
          <CurrentSmall weatherData={weatherData} />
        </Tile>
        <ScrollView style={styles.singleForecasts}>
          {this.renderForecast(weatherData, location)}
          <View style={styles.bumper} />
        </ScrollView>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    opacity: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  viewForecast: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textForecast: {
    fontFamily: 'arvo',
  },
  singleForecasts: {
    paddingTop: 30,
    padding: 10
  },
  bumper: {
    height: 70
  }
})

export default Forecast;
