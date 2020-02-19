import React, {memo} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import {isEmpty} from 'lodash'

const WeatherInformation = memo(({weatherInfo}) => {
  const {clouds, main} = weatherInfo

  if (isEmpty(main)) {
    return (
      <View style={styles.container}>
        <Text>Write the city you want to know the weather of</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        {/* this should be in i18n */}
        <Text>Min temperature: </Text>
        <Text>{main.temp_min}</Text>
        <Text>Max temperature: </Text>
        <Text>{main.temp_max}</Text>
        <Text>Temperature: </Text>
        <Text>{main.temp}</Text>
        <Text>Pressure: </Text>
        <Text>{main.pressure}</Text>
        <Text>Humidity: </Text>
        <Text>{main.humidity}</Text>
      </View>
      <View>
        {clouds.all >= '60' ? (
          <Image
            source={require('./images/rain-icon.png')}
            style={{height: 200, width: 200}}
          />
        ) : (
          <Image
            source={require('./images/sun-icon.png')}
            style={{height: 200, width: 200}}
          />
        )}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})

export default WeatherInformation
