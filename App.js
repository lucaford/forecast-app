import React, {useState, useRef, useCallback, memo} from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Axios from 'axios';

import Map from './src/components/Maps/Map';
import CityInput from './src/components/CityInput/CityInput';
import WeatherInformation from './src/components/WeatherInformation/WeatherInformation';

// should be in .env
const WEATHER_API_KEY = '7e1bfbfd5085077f6af4f13371a8dc8a';

const App = memo(() => {
  const [cityInput, setCityInput] = useState('');
  const [weatherInformation, setWeatherInformation] = useState({
    main: '',
    clouds: '',
  });
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

      // in large apps I would use Mobx
      await AsyncStorage.setItem('lastSearches', JSON.stringify(lastSearches));

      // all axios requests should be in another file.
      const response = await Axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${WEATHER_API_KEY}`,
      );
      setCityInput('');
      const {
        data: {main, coord, clouds},
      } = response;
      setWeatherInformation({main, clouds});

      await mapRef.current.fitToCoordinates(coord);
    } catch (error) {
      // navigate to error screen
      Alert.alert('Ups ... an error occurred');
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
          <CityInput
            onChangeCityInputText={handleChangeCityInputText}
            onSearchByCityPress={handleSearchByCityPress}
            value={cityInput}
          />

          <WeatherInformation weatherInfo={weatherInformation} />

          <Map ref={mapRef} />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
