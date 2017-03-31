import React, { Component } from 'react';
import './style.css';
import Header from '../../components/Header/index.js';
import Stories from '../Stories/index.js';
import Viewer from '../Viewer/index.js';
import Comments from '../Comments/index.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="AppNavigation">
          <Stories />
          <Viewer />
          <Comments />
        </div>
      </div>
    );
  }
}

export default App;
