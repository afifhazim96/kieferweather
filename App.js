import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import * as Animatable from 'react-native-animatable';
import Router from './src/router';

export default class App extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      sky: '#131e26', // #699cbc
      sun: 'rgba(99,30,17,0.8)', // rgba(239,195,19,0.8)
      loading: true
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setBackground();
    this.loadFonts();
  }

  loadFonts = async () => {
    await Font.loadAsync({
      'weather': require('./assets/weather.ttf'),
      'arvo': require('./assets/arvo.ttf'),
      'archivo': require('./assets/archivo.ttf'),
    });
    this.setState({ loading: false });
  }

  setBackground = () => {
    const hour = new Date().getHours();
    if (hour > 9 && hour < 17) { // daylight von 10 - 17 Uhr
      this.setState({ sky: '#699cbc', sun: 'rgba(239,195,79,0.6)' });
    } else if (hour > 20 || hour < 6) { // night von 21 - 5 Uhr
      this.setState({ sky: '#25292b', sun: '#0a1821' })
    }
  }

  componentWillUnmount() {
   this._isMounted = false;
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.sky }]}>
        { !this.state.loading &&
          <Animatable.View animation="fadeInDown" duration={1200} style={styles.header}>
            <Text style={styles.gariweather}>Kieferweather</Text>
            <Text style={styles.subLine}>The best weather forecast.</Text>
          </Animatable.View>
        }
        { !this.state.loading &&
        <Animatable.View
          style={styles.containerInner}
          animation="fadeInUp"
          duration={3000}
          delay={1000}
        >
          <LinearGradient
            colors={['transparent', this.state.sun]}
            style={{ flex: 1 }}
          >
            {!this.state.loading && <Router />}
          </LinearGradient>
        </Animatable.View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70
  },
  containerInner: {
    flex: 1
  },
  contentWrapper: {
    flex: 1
  },
  gariweather: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'arvo'
  },
  subLine: {
    fontSize: 13,
    color: '#eee',
    fontFamily: 'arvo'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
