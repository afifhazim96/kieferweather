import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import WeatherIcon from '../weatherIcon';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import Loading from '../loading';
import Tile from '../tile';

class CurrentWeather extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      weatherData: null
    }
  };

  componentDidMount() {
    const weatherData = this.props.weatherData;
    if (weatherData === null) {
      this.fetchWeatherAsync();
    } else {
      this.setState({ weatherData })
    }
  }

  fetchWeatherAsync = async () => {
    const location = this.props.location.coords;
    const latitude = location.latitude;
    const longitude = location.longitude;
    console.log('longitude', longitude);
    const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=bddf92507b75ac8fc51d0cb9568ecf97&units=metric`;
    await fetch(openWeatherURL)
     .then((resp) => resp.json()) // Transform the data into json
      .then((data) => {
        this.weatherSuccess(data);
        this.setState({ weatherData: data });
      })
      .catch(e => console.log(e));
  }

  weatherSuccess = (data) => {
    console.log('success', data);
  }

  render() {
    const weatherData = this.state.weatherData;
    const location = this.props.location;
    if (weatherData !== null) {
      return (
        <View style={styles.container}>
          <View style={styles.weatherView}>
            <Animatable.Text animation="fadeInDown" delay={1000} style={styles.placeText}>
              {weatherData.name}
              { this.props.byName ?
                <Text style={{ fontSize: 12 }}> ({weatherData.sys.country})</Text> :
                <Text> <Ionicons name="md-pin" size={14} color="#aaa" /></Text>
              }
            </Animatable.Text>
            <Animatable.Text animation="fadeInDown" delay={900} style={styles.weatherText}>
              {weatherData.weather[0].description}
            </Animatable.Text>
            <Animatable.View animation="fadeInDown" delay={800}>
              <WeatherIcon>{weatherData.weather[0].icon}</WeatherIcon>
            </Animatable.View>
            <Animatable.Text animation="fadeInDown" delay={700} style={styles.tempText}>
              {weatherData.main.temp}°
            </Animatable.Text>
          </View>
          <TouchableOpacity
            style={styles.viewForecast}
            onPress={() => Actions.forecast({ weatherData, location })}
          >
            <Text style={styles.textForecast}>Get weather forecast</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <Loading />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 0
  },
  weatherView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  weatherText: {
    fontSize: 12,
    color: '#eee',
    marginTop: 0
  },
  placeText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'arvo',
    marginTop: 10
  },
  tempText: {
    color: '#fff',
    fontSize: 40,
    marginTop: 10,
    fontFamily: 'archivo',
    marginBottom: 10
  },
  viewForecast: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20
  },
  textForecast: {
    fontFamily: 'arvo',
    textAlign: 'center',
    fontSize: 18
  },
  search: {
    alignItems: 'flex-end',
    padding: 10
  }
})

export default CurrentWeather;
