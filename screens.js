import React, {useState, useContext} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
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
import TruSDK from 'tru-sdk-react-native';
const Screens = () => {
  // replace with subdomain gotten from tru.ID dev server
  const baseURL = 'https://proud-dolphin-77.loca.lt';
  const {setShowApp, showApp} = useContext(screenContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState({
    Name: 'phone_number',
    Value: '',
  });
  const [loading, setLoading] = useState(false);

  //reusable error handler function
  const errorHandler = ({title, message}) => {
    return Alert.alert(title, message, [
      {
        text: 'Close',
        onPress: () => console.log('Alert closed'),
      },
    ]);
  };
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
      (error, result) => {
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

        const body = {phone_number: phoneNumber.Value};

        console.log('tru.ID: Creating PhoneCheck for', body);

        fetch(`${baseURL}/phone-check`, {
          body: JSON.stringify(body),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(resp => resp.json())
          .then(data => {
            console.log(data);
            // pass the check url into the Tru SDK and perform the GET request to the PhoneCheck check url
            TruSDK.openCheckUrl(data.check_url)
              .then(() => {})
              .catch(err => {
                setLoading(false);
                errorHandler({
                  title: 'Something went wrong',
                  message: err.message,
                });
              })
              .catch(err => {
                setLoading(false);
                errorHandler({
                  title: 'Something went wrong',
                  message: err.message,
                });
              });
            // Get PhoneCheck result
            fetch(`${baseURL}/phone-check?check_id=${data.check_id}`)
              .then(resp => resp.json())
              .then(phoneCheckData => {
                if (!phoneCheckData.match) {
                  setLoading(false);
                  errorHandler({
                    title: 'Registration Failed',
                    message:
                      'SIM Change Detected. Please contact your network provider',
                  });
                }
                setLoading(false);
                Alert.alert('Registration successful', '✅', [
                  {
                    text: 'Close',
                    onPress: () => console.log('Alert closed'),
                  },
                ]);
              });
          })
          .catch(err => {
            setLoading(false);
            errorHandler({title: 'Something went wrong', message: err.message});
          });
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
                value={email}
                onChangeText={Value => setEmail(Value)}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#d3d3d3"
                value={password}
                onChangeText={Value => setPassword(Value)}
                secureTextEntry
              />
              <TextInput
                style={styles.textInput}
                placeholder="Number ex. +448023432345"
                placeholderTextColor="#d3d3d3"
                keyboardType="phone-pad"
                value={phoneNumber.Value}
                onChangeText={Value =>
                  setPhoneNumber(prevState => ({
                    ...prevState,
                    Value: Value.replace(/\s+/g, ''),
                  }))
                }
              />
              {loading ? (
                <ActivityIndicator size="large" color="#00ff00" />
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
