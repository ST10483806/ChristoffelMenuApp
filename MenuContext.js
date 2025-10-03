import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Bruschetta',
      description: 'Toasted bread with tomatoes, garlic, and fresh basil',
      course: 'starters',
      price: '128.00'
    },
    {
      id: 2,
      name: 'Grilled Salmon',
      description: 'Fresh salmon with herbs and lemon butter sauce',
      course: 'mains',
      price: '385.00'
    },
    {
      id: 3,
      name: 'Tiramisu',
      description: 'Classic Italian dessert with coffee and mascarpone',
      course: 'desserts',
      price: '160.00'
    }
  ]);

  const addMenuItem = (item) => {
    setMenuItems(prevItems => [...prevItems, { ...item, id: Date.now() }]);
  };

  const removeMenuItem = (id) => {
    setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const value = {
    menuItems,
    addMenuItem,
    removeMenuItem
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};