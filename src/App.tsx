import React from 'react';
import './App.css';
import Counter from './counter';
import Calculator from './calculator/calculator';

function App() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"
    }}>
      <Calculator />
    </div>
  );
}

export default App;
