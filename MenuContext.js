import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Bruschetta', description: 'Toasted bread with tomatoes', course: 'starters', price: 120 },
    { id: 2, name: 'Grilled Salmon', description: 'Fresh salmon with herbs', course: 'mains', price: 380 },
    { id: 3, name: 'Tiramisu', description: 'Classic Italian dessert', course: 'desserts', price: 160 },
  ]);

  const addMenuItem = (item) => setMenuItems(prev => [...prev, item]);
  const removeMenuItem = (id) => setMenuItems(prev => prev.filter(i => i.id !== id));

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};
