import React, { Component } from 'react';
import { Keyboard, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as Animatable from 'react-native-animatable';
import CurrentWeather from './currentWeather';
import Loading from '../loading';
import Search from '../search';

class CurrentLocation extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      location: null,
      errorMessage: null,
      loading: true,
      searchBar: false,
      cityText: '',
      weatherData: null,
      byName: false
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getLocationAsync();
  }

  componentWillUnmount() {
   this._isMounted = false;
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied. Please go to settings and enable access to your location. I am not sharing it with anyone.',
        loading: false
      });
    } else {
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
      if (location.coords.latitude !== '' && location.coords.latitude !== null) {
        console.log(location, 'location');
        this._isMounted && this.setState({ location, loading: false });
      } else {
        this.setState({ errorMessage: 'Error while fetching location.', loading: false, location: null })
      }
    }
  };

  search = () => {
    this.toggleSearch();
  }

  toggleSearch = () => {
    let searchBar = this.state.searchBar;
    searchBar ? searchBar = false : searchBar = true;
    this.setState({ searchBar });
  }

  refresh = () => {
    Keyboard.dismiss();
    this.setState({
      location: null, loading: true, errorMessage: null, searching: false, weatherData: null, searchBar: false, byName: false
    });
    this.getLocationAsync();
  }

  searchCity = async () => {
    Keyboard.dismiss();
    this.setState({ loading: true, searchBar: false });
    console.log('Search City');
    const s = this.state.cityText;
    if (s === '') {
      this.setState({ loading: false, searchBar: false });
    } else {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${s}&APPID=bddf92507b75ac8fc51d0cb9568ecf97&units=metric`;
    await fetch(url)
     .then((resp) => resp.json()) // Transform the data into json
      .then((data) => {
        if (data.cod === '404') {
          this.setState({ loading: false, errorMessage: data.message  });
        } else {
          this.setState({ weatherData: data, loading: false, byName: true, location: data.name, errorMessage: null });
        }
        console.log('Test', data);
      })
      .catch(e => console.log(e));
    }
  }

  setText = (cityText) => {
    console.log(cityText);
    this.setState({ cityText });
  }

  search = () => {
    this.setState({ searchBar: true });
  }

  render() {
    const location = this.state.location;
    return (
      <View style={styles.container}>
        { this.state.loading && <Loading /> }
        { this.state.searchBar &&
          <Animatable.View animation="fadeInDown">
            <Search setText={this.setText} cityText={this.state.cityText} searchCity={this.searchCity} />
          </Animatable.View>
        }
        { !this.state.loading && this.state.location !== null &&
          <CurrentWeather
            search={this.search}
            location={location}
            weatherData={this.state.weatherData}
            byName={this.state.byName}
          />
        }
        <View>
        { this.state.errorMessage && <Tile><Text>{this.state.errorMessage}</Text></Tile> }
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.refresh} onPress={() => this.refresh()}>
            <Ionicons name="md-refresh" color="#333" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.refresh} onPress={() => this.search()}>
            <Ionicons name="md-search" color="#333" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 10,
    flexDirection: 'row'
  },
  refresh: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  }
})

export default CurrentLocation;
