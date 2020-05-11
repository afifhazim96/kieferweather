import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

class DisplayForecast extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      random: 20
    }
  };

  componentDidMount() {
    this.randomTemp();
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  randomTemp = () => {
    this._interval = setInterval(() => {
      const max = 35;
      const min = 14;
      const random = Math.floor(Math.random() * (max - min + 1)) + min;
      this.setState({ random });
    },100);
  }

  render() {
    const { loading, temp, icon } = this.props;
    return (
      <View style={styles.container}>
        { loading ?
          <View>
            <View style={styles.row}>
              <Text style={styles.temp}>{this.state.random}°</Text>
              <Animatable.Text animation="pulse" iterationCount="infinite" duration={500} style={styles.icon}>
              &nbsp;A&nbsp;
              </Animatable.Text>
            </View>
            <Text style={styles.subText}>Loading the best weather</Text>
          </View> :
          <View>
            <View style={styles.row}>
              <Text style={styles.temp}>{temp}°</Text>
              <Text style={styles.icon}>&nbsp;{icon}&nbsp;</Text>
            </View>
            <Text style={styles.subText}>-</Text>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'weather',
    color: '#fff',
    fontSize: 80,
    paddingLeft: 40
  },
  temp: {
    fontFamily: 'archivo',
    color: '#fff',
    fontSize: 50
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  subText: {
    fontFamily: 'arvo',
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center'
  }
})

export default DisplayForecast;
