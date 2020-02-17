import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  Text,
  ActivityIndicator,
} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import Axios from 'axios';

import Map from './src/components/Maps/Map';
import CityInput from './src/components/CityInput/CityInput';
import WeatherInformation from './src/components/WeatherInformation/WeatherInformation';

// should be in .env
const WEATHER_API_KEY = '7e1bfbfd5085077f6af4f13371a8dc8a';

const App = () => {
  const [cityInput, setCityInput] = useState('');
  const [weatherInformation, setWeatherInformation] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastSearches, setLastSearches] = useState([]);

  const mapRef = useRef(null);

  const handleChangeCityInputText = value => {
    setCityInput(value);
  };

  const handleSearchByCityPress = async () => {
    try {
      setLoading(true);
      setLastSearches(cities => cities.concat(cityInput));
      await AsyncStorage.setItem('lastSearches', JSON.stringify(lastSearches));
      const response = await Axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${WEATHER_API_KEY}`,
      );
      console.log('RESPONSE DATA: ', response.data);
      setCityInput('');
      const {
        data: {main, coord},
      } = response;
      setWeatherInformation(main);
      mapRef.current.fitToCoordinates(coord);
    } catch (error) {
      // navigate to error screen
      console.log('Navigate to error screen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.cityInputContainer}>
            <CityInput
              onChangeCityInputText={handleChangeCityInputText}
              onSearchByCityPress={handleSearchByCityPress}
              value={cityInput}
            />
          </View>

          <WeatherInformation weatherInfo={weatherInformation} />

          <View style={styles.mapContainer}>
            <Map ref={mapRef} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  cityInputContainer: {
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

  mapContainer: {
    flex: 1,
  },
});

export default App;
