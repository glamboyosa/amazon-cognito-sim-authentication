import React, {createContext, useState} from 'react';

export const screenContext = createContext({
  showApp: false,
  setShowApp: value => {},
});

const Provider = props => {
  const [showApp, setShowApp] = useState(false);

  return (
    <screenContext.Provider value={{setShowApp, showApp}}>
      {props.children}
    </screenContext.Provider>
  );
};
export default Provider;
