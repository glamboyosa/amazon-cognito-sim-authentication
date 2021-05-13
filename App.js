import AsyncStorage from '@react-native-async-storage/async-storage';
import DoneButton from './components/DoneButton';
import NextButton from './components/NextButton';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
// import {
// 	CognitoUserPool,
// 	CognitoUserAttribute,
// } from 'amazon-cognito-identity-js';
const App = () => {
  // get from async storage
  const [showApp, setShowApp] = useState(false);
  //AsyncStorage.removeItem('showForm');
  // AsyncStorage.getItem('showForm').then(data => {
  //   setShowApp(data);
  // });
  // const [showApp, setShowApp] = useState(false);
  const [email, setEmail] = useState({
    Name: 'email',
    Value: '',
  });
  const [password, setPassword] = useState({
    Name: 'password',
    Value: '',
  });
  const [phoneNumber, setPhoneNumber] = useState({
    Name: 'phone_number',
    Value: '',
  });
  const registerHandler = async () => {
    console.log('Register handler triggered');
  };
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
          <Text style={styles.heading}>tru.ID + Amazon Cognito</Text>
          <View style={styles.form}>
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#d3d3d3"
                value={email.Value}
                onChangeText={Value =>
                  setEmail(prevState => ({...prevState, Value}))
                }
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#d3d3d3"
                value={password.Value}
                onChangeText={Value =>
                  setPassword(prevState => ({...prevState, Value}))
                }
              />
              <TextInput
                style={styles.textInput}
                placeholder="Number ex. +448023432345"
                placeholderTextColor="#d3d3d3"
                keyboardType="phone-pad"
                value={phoneNumber.Value}
                onChangeText={Value =>
                  setPhoneNumber(prevState => ({...prevState, Value}))
                }
              />
              <TouchableOpacity onPress={registerHandler} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
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
  heading: {
    fontSize: 40,
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  textInput: {
    padding: 15,
    borderColor: '#20232a',
    borderWidth: 3,
    elevation: 7,
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 10,
    width: 0.8 * Dimensions.get('window').width,
  },
  button: {
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e67e22',
    color: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
});

export default App;
