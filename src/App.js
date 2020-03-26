import React from 'react';
import './App.scss';
import {Board} from "./components/Board";
import {ShipSelector} from "./components/ShipSelector";

function App() {
  return (
    <div className="App">
      <Board/>
      <ShipSelector/>
    </div>
  );
}

export default App;
