import React from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Table from './components/Table'
import Info from './components/Info'
import Button from './components/Button'

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <div className="game">
        <Info />
        <Table />
        <Button />
      </div>
    </Provider>
  );

}

export default App;
