import React, {useState, memo, useEffect} from 'react';
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
import {isEmpty} from 'lodash';
import WeatherInformation from './src/components/WeatherInformation/WeatherInformation';

// should be in .env
const WEATHER_API_KEY = '7e1bfbfd5085077f6af4f13371a8dc8a';
const WEATHER_API_BASE_URL = 'http://api.openweathermap.org/data';

const App = memo(() => {
  const [cityInput, setCityInput] = useState('');
  const [region, setRegion] = useState();
  const [loading, setLoading] = useState(false);
  const [lastSearches, setLastSearches] = useState([]);
  const [weatherInformation, setWeatherInformation] = useState({
    main: '',
    clouds: '',
  });

  useEffect(() => {
    //i would move all AsyncStorage calls to another file and make them like getters/setters. This shouldn't be here
    const getLastSearches = async () => {
      const jsonLastSearches = await AsyncStorage.getItem('lastSearches');
      if (!isEmpty(jsonLastSearches)) {
        const lastSearches = JSON.parse(jsonLastSearches);
        setLastSearches(lastSearches);
      }
    };

    getLastSearches();
  }, []);

  const handleChangeCityInputText = value => {
    setCityInput(value);
  };

  const handleSearchByCityPress = async () => {
    try {
      setLoading(true);

      if (lastSearches.length >= 5) {
        let cities = lastSearches.slice(1, 5);
        setLastSearches(cities);
      }
      setLastSearches(cities => cities.concat(cityInput));

      // in large apps I would use Mobx.
      AsyncStorage.setItem('lastSearches', JSON.stringify(lastSearches));

      // all axios requests should be in another file.
      const response = await Axios.get(
        `${WEATHER_API_BASE_URL}/2.5/weather?q=${cityInput}&appid=${WEATHER_API_KEY}`,
      );

      setCityInput('');
      const {
        data: {main, coord, clouds},
      } = response;
      setWeatherInformation({main, clouds});

      setRegion({
        latitudeDelta: 1,
        longitudeDelta: 1,
        latitude: coord.lat,
        longitude: coord.lon,
      });
    } catch (error) {
      // handle what type of error is and navigate to another screen
      Alert.alert('Ups ... city not found');
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
            lastSearches={lastSearches}
          />

          <WeatherInformation weatherInfo={weatherInformation} />

          <Map region={region} />
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
