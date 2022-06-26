import React, { useEffect, useState } from 'react';
// import { categories as fakeCat } from '../data/fakedata';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const DataContext = React.createContext({});

export const useData = () => {
  return React.useContext(DataContext);
};
const DataProvider = ({ children }) => {
  const [activeItem, setactiveItem] = useState(null);
  const [loadingCats, setLoadingCats] = useState(false);
  const [categories, setCategories] = useState([]);
  const [ads, setAds] = useState([]);
  const { isAuth } = useAuth();

  const dispatchAction = (actionType, payload) => {
    switch (actionType) {
      case 'SET_ACTIVE_ITEM':
        setactiveItem(payload);
        return;

      case 'SET_CATEGORIES':
        setCategories(payload);
        return;

      default:
        return;
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    let arr = [];
    const querySnapshot = await getDocs(collection(db, 'categories'));
    querySnapshot.forEach(doc => {
      arr.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setCategories(arr);
    setLoadingCats(false);
  }
  async function getUserAds() {
    let arr = [];
    const q = query(collection(db, 'ads'), where('user.id', '==', isAuth));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      arr.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setAds(arr);
    console.log(arr);
  }
  return (
    <DataContext.Provider
      value={{
        dispatchAction,
        activeItem,
        ads,
        getUserAds,
        loadingCats,
        categories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;
