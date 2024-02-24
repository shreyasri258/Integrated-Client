import React, { createContext, useState } from 'react';

// Create a new context
export const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
 const [selectedRole, setSelectedRole] = useState('');

 return (
    <GlobalStateContext.Provider value={{ selectedRole, setSelectedRole }}>
      {children}
    </GlobalStateContext.Provider>
 );
};
