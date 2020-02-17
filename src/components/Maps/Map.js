import React, {useImperativeHandle, forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const Map = forwardRef(({}, ref) => {
  let mapRef = null;
  useImperativeHandle(ref, () => ({
    fitToCoordinates: coordinates => {
      mapRef.animateToRegion(
        {
          latitude: coordinates.lon,
          longitude: coordinates.lat,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        2000,
      );
    },
  }));

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -34.6105954,
        longitude: -58.3995135,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      ref={ref => {
        mapRef = ref;
      }}
    />
  );
});

const styles = StyleSheet.create({
  map: {
    height: 400,
  },
});

export default Map;
