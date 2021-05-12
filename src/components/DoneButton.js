import {View, TouchableOpacity, StyleSheet} from 'react-native';

const DoneButton = ({props}) => (
  <View {...props}>
    <TouchableOpacity style={styles.button}>Sign Up!</TouchableOpacity>
  </View>
);
const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 8,
    backgroundColor: '#fff',
    fontSize: 10,
    color: '#000',
  },
});
export default DoneButton;
