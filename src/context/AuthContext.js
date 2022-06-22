import { useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const AuthContext = React.createContext({});

export const useAuth = () => {
  return React.useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const [userData, setUserData] = useState(null);
  const toast = useToast();
  let _PROVIDER = useRef(null);
  let _SIGNER = useRef(null);

  const detectCurrentProvider = useCallback(async () => {
    if (window.ethereum) {
      _PROVIDER.current = new ethers.providers.Web3Provider(
        window.ethereum,
        'any'
      );
      _PROVIDER.current.on('network', (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload();
        }
      });
      let net = await _PROVIDER.current.getNetwork();

      if (net.name === 'rinkeby') {
        let acct = await _PROVIDER.current.listAccounts();
        acct[0] && setAuth(acct[0]);
      }
    }
    return _PROVIDER.current;
  }, [_PROVIDER]);

  const connect = async () => {
    if (_PROVIDER.current) {
      let net = await _PROVIDER.current.getNetwork();

      if (net.chainId === 1029) {
        let accounts = await _PROVIDER.current.send('eth_requestAccounts', []);
        _SIGNER.current = _PROVIDER.current.getSigner();
        setAuth(accounts[0]);
      } else {
        console.log(net);
        toast({
          title: 'Please connect to Bittorent',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        status: 'error',
        title: 'Cannot detect current provider',
        description: 'Please install MetaMask',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const dispatchAuthAction = (actionType, payload) => {
    switch (actionType) {
      case 'SET_AUTH':
        setAuth(payload);
        return;
      case 'LOGOUT':
        _PROVIDER.current = null;
        setAuth(false);

        return;
      case 'CONNECT':
        !isAuth && connect();
        return;
      case 'SET_USER_DATA':
        setUserData({});
        return;

      default:
        return;
    }
  };

  useEffect(() => {
    detectCurrentProvider();
  }, [detectCurrentProvider]);

  return (
    <AuthContext.Provider
      value={{ isAuth, _PROVIDER, _SIGNER, userData, dispatchAuthAction }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
