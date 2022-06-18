import React, { useState } from 'react';
import { categories as fakeCat } from '../data/fakedata';
const DataContext = React.createContext({});

export const useData = () => {
  return React.useContext(DataContext);
};
const DataProvider = ({ children }) => {
  const [activeItem, setactiveItem] = useState(null);
  const [categories, setCategories] = useState(fakeCat);

  const dispatchAction = (actionType, payload) => {
    switch (actionType) {
      case 'SET_ACTIVE_POST':
        setactiveItem(payload);
        return;

      case 'SET_CATEGORIES':
        setCategories(payload);
        return;

      default:
        return;
    }
  };

  return (
    <DataContext.Provider value={{ dispatchAction, activeItem, categories }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;
