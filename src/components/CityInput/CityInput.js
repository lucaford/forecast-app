import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

const CityInput = ({onChangeCityInputText, onSearchByCityPress, value}) => (
  <View style={styles.container}>
    <View>
      <TextInput
        placeholder="Ingresá las tres primeras letras"
        style={styles.textInput}
        onChangeText={onChangeCityInputText}
        value={value}
      />
    </View>
    <View style={styles.actionButtons}>
      <TouchableWithoutFeedback onPress={onSearchByCityPress}>
        <Text style={styles.searchsText}>Buscar</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Text style={styles.searchsText}>Últimas busquedas</Text>
      </TouchableWithoutFeedback>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  textInput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
  },

  searchsText: {
    color: 'violet',
    textAlign: 'center',
    marginTop: 5,
  },

  actionButtons: {},
});

export default CityInput;