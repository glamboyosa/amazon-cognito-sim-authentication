import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Appearance,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

import DoneButton from './components/DoneButton';
import NextButton from './components/NextButton';

import {screenContext} from './context';

const Screens = () => {
  // replace with subdomain gotten from tru.ID dev server
  const baseURL = 'https://{subdomain}.loca.lt';
  const {setShowApp, showApp} = useContext(screenContext);

  const registerHandler = async () => {};
  
  return (
    <>
      {!showApp ? (
        <Onboarding
          NextButtonComponent={NextButton}
          DoneButtonComponent={DoneButton}
          bottomBarHighlight={false}
          onDone={() => setShowApp(true)}
          pages={[
            {
              backgroundColor: '#FF8C00',
              title: 'Blazingly Fast',
              subtitle: 'Up to 50x faster than alternatives.',
              image: <Image source={require('./images/man-on-phone.png')} />,
            },
            {
              backgroundColor: '#00FF7F',
              title: 'Get Started',
              subtitle: 'Create an account to get started.',
              image: <Image source={require('./images/woman-on-phone.png')} />,
            },
          ]}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.images}>
            <Image source={require('./images/tru-id-logo.png')} />
            <Text style={styles.plus}>+</Text>
            <Image source={require('./images/aws-cognito-logo.png')} />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 15,
    alignItems: 'center',
  },
  plus: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 30,
    color: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  spinner: {
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1955ff',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#1955ff',
    marginTop: 17,
    width: '40%',
  },
  buttonText: {
    color: '#fff',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    padding: 15,
    borderRadius: 3,
    backgroundColor: '#fff',
    borderColor: '#858585',
    borderWidth: 0.4,
    elevation: 7,
    marginBottom: 10,
    shadowColor: '#858585',
    shadowOffset: {width: 0.5, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    color: '#000',
    width: 0.7 * Dimensions.get('window').width,
  },
});
export default Screens;
