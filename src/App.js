import React from 'react';
import Provider from './context';
import Screens from './screens';

const App = () => (
  <Provider>
    <Screens />
  </Provider>
);

export default App;
