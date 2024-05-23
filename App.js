import React from 'react';
import Task from './MyComp/Work.js';
import { TaskProvider } from './MyComp/task';
import './MyComp/App.css';

const App = () => {
  return (
    <TaskProvider>
      <Task />
    </TaskProvider>
  );
};

export default App;
