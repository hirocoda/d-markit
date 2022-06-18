import React, { useState } from 'react';
const Auth = React.createContext({});

export const useAuth = () => {
  return React.useContext(Auth);
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const dispatchAuthAction = (actionType, payload) => {
    switch (actionType) {
      case 'SET_USER':
        setUser(payload);
        return;

      default:
        return;
    }
  };

  return (
    <Auth.Provider value={{ dispatchAuthAction, user }}>
      {children}
    </Auth.Provider>
  );
};
export default AuthProvider;
