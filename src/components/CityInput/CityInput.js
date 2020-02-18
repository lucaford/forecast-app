import React, {memo} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  AsyncStorage,
  TouchableWithoutFeedback,
} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';

// i would move all AsyncStorage calls to another file and make them like getters/setters. This shouldn't be here
const getLastSearches = async () => {
  const jsonLastSearches = await AsyncStorage.getItem('lastSearches');

  return JSON.parse(jsonLastSearches);
};

const LastSearches = () => {
  // const lastSearches = getLastSearches();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
      {/* {lastSearches.map(city => (
        <Text>{city}</Text>
      ))} */}
    </View>
  );
};

const CityInput = memo(
  ({onChangeCityInputText, onSearchByCityPress, value}) => (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Ingresá las tres primeras letras"
          style={styles.textInput}
          onChangeText={onChangeCityInputText}
          value={value}
        />
      </View>
      <View style={styles.actionButtons}>
        <TouchableWithoutFeedback onPress={onSearchByCityPress}>
          <Text style={styles.searchsText}>Search</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Text style={styles.searchsText}>Last searches</Text>
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <LastSearches />
      </View>
    </View>
  ),
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    ...ifIphoneX(
      {
        paddingTop: 50,
      },
      {
        paddingTop: 20,
      },
    ),
  },

  textInput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
  },

  searchsText: {
    color: 'violet',
    textAlign: 'center',
    marginTop: 5,
  },

  actionButtons: {},
});

export default CityInput;
