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

import TruSDK from '@tru_id/tru-sdk-react-native';

import {AMAZON_USER_POOL_ID, AMAZON_CLIENT_ID} from '@env';
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

const errorHandler = ({title, message}) => {
  return Alert.alert(title, message, [
    {
      text: 'Close',
      onPress: () => console.log('Alert closed'),
    },
  ]);
};

// replace with subdomain gotten from tru.ID localTunnel URL
const baseURL = 'https://{subdomain}.loca.lt';

async function createPhoneCheck(phoneNumber) {
  const body = {phone_number: phoneNumber};

  console.log('tru.ID: Creating PhoneCheck for', body);

  const response = await fetch(`${baseURL}/phone-check`, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();

  return json;
}

async function getPhoneCheck(checkId) {
  const response = await fetch(`${baseURL}/phone-check?check_id=${checkId}`);
  const json = await response.json();
  return json;
}

const Screens = () => {
  const {setShowApp, showApp} = useContext(screenContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState({
    Name: 'phone_number',
    Value: '',
  });
  const [loading, setLoading] = useState(false);

  const registerHandler = async () => {
    console.log('Register handler triggered');

    const cognitoAttributeList = [];

    const userPool = new CognitoUserPool({
      UserPoolId: AMAZON_USER_POOL_ID,
      ClientId: AMAZON_CLIENT_ID,
    });

    console.log(userPool);

    // pass extra attribute `phoneNumber` state into `CognitoUserAttribute`
    const attributePhoneNumber = new CognitoUserAttribute(phoneNumber);

    // push Cognito User Attributes into `cognitioAttributeList`
    cognitoAttributeList.push(attributePhoneNumber);

    setLoading(true);

    console.log('AWS: signUp()');

    userPool.signUp(
      email,
      password,
      cognitoAttributeList,
      null,
      async (error, result) => {
        console.log(error, result);

        if (error) {
          setLoading(false);

          errorHandler({
            title: 'Something went wrong.',
            message: error.message,
          });

          return;
        }

        console.log('AWS userPool signUp Result:', result);

        console.log('tru.ID: Creating PhoneCheck for', phoneNumber);

        try {
          const reachabilityDetails = TruSDK.isReachable();

          const reachabilityInfo = JSON.parse(reachabilityDetails);

          if (reachabilityInfo.error.status === 400) {
            errorHandler({
              title: 'Something went wrong.',
              message: 'MNO not supported',
            });
            setLoading(false);

            return;
          }
          let isPhoneCheckSupported = false;

          if (reachabilityInfo.error.status !== 412) {
            for (const {productType} of reachabilityInfo.products) {
              console.log('supported products are', productType);

              if (productType === 'PhoneCheck') {
                isPhoneCheckSupported = true;
              }
            }
          } else {
            isPhoneCheckSupported = true;
          }

          if (!isPhoneCheckSupported) {
            errorHandler({
              title: 'Something went wrong.',
              message: 'PhoneCheck is not supported on MNO',
            });
          }
          const phoneCheck = await createPhoneCheck(phoneNumber.Value);

          console.log('tru.ID: Created PhoneCheck', phoneCheck);

          await TruSDK.openCheckUrl(phoneCheck.check_url);

          console.log('Getting PhoneCheck result', phoneCheck.check_id);

          const phoneCheckResult = await getPhoneCheck(phoneCheck.check_id);

          console.log('Received PhoneCheck result', phoneCheckResult);

          setLoading(false);

          if (phoneCheckResult.match) {
            Alert.alert('Registration successful', '✅', [
              {
                text: 'Close',
                onPress: () => console.log('Alert closed'),
              },
            ]);
          } else {
            errorHandler({
              title: 'Registration Failed',
              message: 'PhoneCheck match failed. Please contact support',
            });
          }
        } catch (err) {
          setLoading(false);

          errorHandler({
            title: 'Something went wrong',
            message: err.message,
          });
        }
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
            <View style={styles.center}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#d3d3d3"
                keyboardType="email-address"
                value={email}
                editable={!loading}
                onChangeText={Value => setEmail(Value)}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#d3d3d3"
                value={password}
                editable={!loading}
                onChangeText={Value => setPassword(Value)}
                secureTextEntry
              />
              <TextInput
                style={styles.textInput}
                placeholder="Number ex. +448023432345"
                placeholderTextColor="#d3d3d3"
                keyboardType="phone-pad"
                value={phoneNumber.Value}
                editable={!loading}
                onChangeText={Value =>
                  setPhoneNumber(prevState => ({
                    ...prevState,
                    Value: Value.replace(/\s+/g, ''),
                  }))
                }
              />
              {loading ? (
                <ActivityIndicator
                  style={styles.spinner}
                  size="large"
                  color="#00ff00"
                />
              ) : (
                <TouchableOpacity
                  onPress={registerHandler}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              )}
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
