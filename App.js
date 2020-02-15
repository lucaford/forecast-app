import React from 'react';
import {StyleSheet, View} from 'react-native';

import Map from './src/components/Maps/Map';

const App = () => (
  <View style={styles.container}>
    <View style={styles.mapContainer}>
      <Map />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mapContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default App;
