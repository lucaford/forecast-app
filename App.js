import React, {useState} from 'react';
import {StyleSheet, View, AsyncStorage} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';

import Map from './src/components/Maps/Map';
import CityInput from './src/components/CityInput/CityInput';
import WeatherResponseExample from './src/utils/WeatherResponseExample';

const App = () => {
  const [cityInput, setCityInput] = useState('');
  const [lastSearches, setLastSearches] = useState([]);

  const handleChangeCityInputText = value => {
    setCityInput(value);
  };

  const handleSearchByCityPress = async () => {
    setLastSearches(cities => cities.concat(cityInput));
    await AsyncStorage.setItem('lastSearches', JSON.stringify(lastSearches));
    setCityInput('');

    console.log(WeatherResponseExample.coord);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cityInputContainer}>
        <CityInput
          onChangeCityInputText={handleChangeCityInputText}
          onSearchByCityPress={handleSearchByCityPress}
          value={cityInput}
        />
      </View>
      <View style={styles.mapContainer}>
        <Map />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cityInputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    ...ifIphoneX(
      {
        paddingTop: 50,
      },
      {
        paddingTop: 20,
      },
    ),
  },

  mapContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default App;
