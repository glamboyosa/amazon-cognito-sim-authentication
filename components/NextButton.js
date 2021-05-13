import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
const NextButton = ({props}) => (
  <View style={styles.container} {...props}>
    <Text style={styles.rightArrow}>&rarr;</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    padding: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginRight: 18,
  },
  rightArrow: {
    color: '#FFF',
    fontSize: 20,
  },
});
export default NextButton;
