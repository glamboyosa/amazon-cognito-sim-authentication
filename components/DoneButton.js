import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import React, {useContext} from 'react';
import {screenContext} from '../context';
const DoneButton = ({props}) => {
  const {setShowApp} = useContext(screenContext);
  return (
    <View>
      <TouchableOpacity
        {...props}
        onPress={async () => setShowApp(true)}
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
