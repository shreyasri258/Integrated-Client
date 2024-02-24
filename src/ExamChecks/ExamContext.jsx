import React, { createContext, useContext, useState } from 'react';

// Create ExamContext
const ExamContext = createContext();

// Custom hook to use ExamContext
export const useExamContext = () => useContext(ExamContext);

// ExamProvider component to wrap your application with
export const ExamProvider = ({ children }) => {
  const [examData, updateExamData] = useState([]); // Initialize examData as an empty array

  const updateExamDetails = (newExamData) => {
    updateExamData(newExamData);
  };

  return (
    <ExamContext.Provider value={{ examData, updateExamDetails }}>
      {children}
    </ExamContext.Provider>
  );
};
