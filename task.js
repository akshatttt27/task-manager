import React, { createContext, useContext, useReducer } from 'react';

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'UPDATE_TASK':
      return state.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);