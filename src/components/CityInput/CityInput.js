import React, {memo} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';

// i would set propTypes with every prop that the component is receiving
const CityInput = memo(
  ({onChangeCityInputText, onSearchByCityPress, value, lastSearches}) => (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Ingresá las tres primeras letras"
          style={styles.cityInput}
          onChangeText={onChangeCityInputText}
          value={value}
        />
      </View>
      <View style={styles.actionButtons}>
        <TouchableWithoutFeedback onPress={onSearchByCityPress}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableWithoutFeedback>
        <Text style={[styles.searchText, styles.lastSearchText]}>
          {/* i would put last searches on an overlay with transparent background, using react-native-navigation ( wix ) */}
          Last searches
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        {/* // i would cut off repeated cities */}
        {lastSearches.map((city, index) => (
          <TouchableWithoutFeedback
            onPress={() => onChangeCityInputText(city)}
            key={index}>
            <Text style={styles.cityText}>{city}</Text>
          </TouchableWithoutFeedback>
        ))}
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

  cityInput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
  },

  searchText: {
    color: 'violet',
    textAlign: 'center',
    marginTop: 5,
  },

  lastSearchText: {
    color: 'black',
    marginBottom: 10,
    fontWeight: 'bold',
  },

  cityText: {
    color: 'violet',
    textAlign: 'center',
    marginTop: 5,
  },

  actionButtons: {},
});

export default CityInput;
