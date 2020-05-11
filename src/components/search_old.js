import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Tile from './tile';
import BackBtn from './backBtn';


class Search extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      text: '',
      loading: false,
      weatherData: null
    }
  };

  search = async () => {
    this.setState({ loading: true })
    const s = this.state.text;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${s}&APPID=bddf92507b75ac8fc51d0cb9568ecf97&units=metric`;
    await fetch(url)
     .then((resp) => resp.json()) // Transform the data into json
      .then((data) => {
        this.setState({ weatherData: data, loading: false });
        console.log(data, 'data');
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <View style={styles.outer}>
      <Tile>
        <View style={styles.container}>
          <BackBtn />
          <TextInput
            value={this.state.text}
            onChangeText={(text) => this.setState({ text })}
            style={styles.input}
            placeholder="Search City"
          />
          <TouchableOpacity onPress={() => this.search()} style={styles.btn}>
            <AntDesign name="caretright" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </Tile>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  outer: {
    padding: 20
  },
  input: {
    padding: 10,
    backgroundColor: 'rgba(250,250,250,0.8)',
    flex: 1,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 5
  },
  btn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(250,250,250,0.8)',
    borderRadius: 18,
  }
});

export default Search;
