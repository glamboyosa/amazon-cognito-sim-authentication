import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
const DoneButton = ({props}) => {
  return (
    <View>
      <TouchableOpacity
        {...props}
        onPress={async () => {
          // console.log('onboarding done');
          // try {
          //   await AsyncStorage.setItem('showForm', 'show');
          // } catch (e) {
          //   throw new Error(e.message);
          // }
        }}
        style={styles.button}>
        <Text>Sign Up!</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 8,
    backgroundColor: '#fff',
    fontSize: 10,
    color: '#000',
    marginRight: 20,
    marginBottom: 10,
  },
});
export default DoneButton;
