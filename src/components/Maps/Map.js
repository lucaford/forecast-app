import React from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const Map = () => (
  <MapView
    style={styles.map}
    initialRegion={{
      latitude: -34.6105954,
      longitude: -58.3995135,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    ref={ref => {
      this.map = ref;
    }}
  />
);

const styles = StyleSheet.create({
  map: {
    height: 400,
  },
});

export default Map;
