import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Tile from './tile';


const Search = ({ cityText, setText, searchCity }) => (
  <View style={styles.outer}>
    <Tile>
      <View style={styles.container}>
        <TextInput
          value={cityText}
          onChangeText={(text) => setText(text)}
          style={styles.input}
          placeholder="Search City"
          autoFocus
          onSubmitEditing={searchCity}
          returnKeyType='search'
        />
        <TouchableOpacity onPress={searchCity} style={styles.btn}>
          <AntDesign name="caretright" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    </Tile>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  outer: {
    paddingBottom: 10,
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
