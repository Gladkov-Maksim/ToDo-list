import React from 'react';
import { ToDo } from './features/toDo/toDo';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToDo />
      </header>
    </div>
  );
}

export default App;
