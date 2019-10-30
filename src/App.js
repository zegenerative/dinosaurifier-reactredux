import React, { Component } from 'react';
import DinoNameContainer from './Components/DinoNameContainer';
import DinoDescriptionContainer from './Components/DinoDescriptionContainer';

export default class App extends Component {

  render() {
    return (
      <div>
        <h1>THE DINOSAURIFIER</h1>
        <DinoNameContainer />
        <DinoDescriptionContainer />
      </div>
    );
  }
}