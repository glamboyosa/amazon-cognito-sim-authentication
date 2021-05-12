import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import DoneButton from './components/DoneButton';
import NextButton from './components/NextButton';

const App = () => {
  const [showApp, setShowApp] = useState(false);

  return (
    <>
      {!showApp ? (
        <Onboarding
          DoneButtonComponent={DoneButton}
          NextButtonComponent={NextButton}
          onDone={() => setShowApp(true)}
          bottomBarHighlight={false}
          pages={[
            {
              backgroundColor: '#FF8C00',
              title: 'Blazingly Fast',
              subtitle: 'Up to 50x faster than alternatives.',
            },
            {
              backgroundColor: '#00FF7F',
              title: 'Get Started',
              subtitle: 'Create an account to get started.',
            },
          ]}
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.heading}>tru.ID + Amazon Cognito</Text>
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
});

export default App;
