import {StyleSheet, View} from 'react-native';
import {FaArrowRight} from 'react-icons/fa';
const NextButton = ({props}) => (
  <View style={styles.container} {...props}>
    <FaArrowRight color="#fff" />
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
  },
});
export default NextButton;
