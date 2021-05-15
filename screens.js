import React, {useState, useContext} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import DoneButton from './components/DoneButton';
import NextButton from './components/NextButton';
import {screenContext} from './context';
import {AMAZON_USER_POOL_ID, AMAZON_CLIENT_ID} from '@env';
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
const Screens = () => {
  // replace with subdomain gotten from tru.ID dev server
  const baseURL = 'https://{subdomain}.local.lt';
  const {setShowApp, showApp} = useContext(screenContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState({
    Name: 'phone_number',
    Value: '',
  });
  const registerHandler = async () => {
    console.log('Register handler triggered');
    const userPool = new CognitoUserPool({
      UserPoolId: AMAZON_USER_POOL_ID,
      ClientId: AMAZON_CLIENT_ID,
    });
    const cognitoAttributeList = [];

    // pass extra attribute `phoneNumber` state into `CognitoUserAttribute`

    const attributePhoneNumber = CognitoUserAttribute(phoneNumber);

    // push Cognito User Attributes into `cognitioAttributeList`
    cognitoAttributeList.push(attributePhoneNumber);

    userPool.signUp(
      email,
      password,
      cognitoAttributeList,
      null,
      (error, result) => {
        console.log(error, result);
        // check for error, do phoneCheck stuff
      },
    );
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
          <View style={styles.images}>
            <Image source={require('./images/tru-id-logo.png')} />
            <Text style={styles.plus}>+</Text>
            <Image source={require('./images/aws-cognito-logo.png')} />
          </View>
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
  buttonText: {
    color: '#fff',
  },
});

export default Screens;
