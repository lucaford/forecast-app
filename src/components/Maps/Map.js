import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const Map = memo(({region}) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -34.6105954,
        longitude: -58.3995135,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }}
      region={region}
    />
  );
});

const styles = StyleSheet.create({
  map: {
    height: 400,
  },
});

export default Map;
