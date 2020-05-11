import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoadingForecast from './loadingForecast';
import DisplayForecast from './displayForecast';
import * as Animatable from 'react-native-animatable';


class SingleForecast extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      loading: true,
      temperature: 20
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.generateTemp();
    setTimeout(() => {
       this.setState({ loading: false });
    },2000);
  }

  generateTemp = () => {
    let temp = this.props.temp;
    temp = Math.round(temp);
    let temperature = 20;
    if (temp < 5) {
      temperature = this.randomTemperature(7,11);
    } else if (temp < 10) {
      temperature = this.randomTemperature(14, 19);
    } else if (temp < 14) {
      temperature = this.randomTemperature(18, 22);
    } else if (temp < 18) {
      temperature = this.randomTemperature(20, 26);
    } else if (temp < 24) {
      temperature = this.randomTemperature(24, 29);
    } else if (temp > 35) {
      temperature = this.randomTemperature(29, 35);
    }
    let icon = 'C'
    if (this.randomTemperature(0, 30) < 15) {
      icon = 'A'
    };
    this.setState({ temperature, icon });
  }

  randomTemperature = (min, max) => {
   const random = Math.floor(Math.random() * (max - min + 1)) + min;
   const temperature = random;
   return temperature;
  }

  render() {
    return (
      <Animatable.View animation="fadeInUp" delay={this.props.delay} style={styles.container}>
        <View style={styles.contentContainer}>
          <DisplayForecast temp={this.state.temperature} loading={this.state.loading} icon={this.state.icon} />
        </View>
        <View style={styles.dateView}>
          <Text style={styles.day}>{this.props.day}</Text>
          <Text style={styles.date}>{this.props.date}</Text>
        </View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'weather',
    color: '#fff',
    fontSize: 50
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    marginTop: 0,
    marginBottom: 30
  },
  day: {
    fontFamily: 'arvo',
    color: '#000',
    fontSize: 30,
    textAlign: 'center'
  },
  date: {
    fontFamily: 'arvo',
    color: '#000',
    fontSize: 16,
    textAlign: 'center'
  },
  dateView: {
    backgroundColor: 'rgba(250,250,250,0.5)',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  contentContainer: {
    padding: 20
  }
})

export default SingleForecast;
