import React, { Component } from 'react';
import 'normalize.css'
import './App.scss';
import SortableTable from './components/SortableTable'


class App extends Component {
  render() {
    return (
      <div className="App">       
        <SortableTable />
      </div>
    );
  }
}

export default App;
