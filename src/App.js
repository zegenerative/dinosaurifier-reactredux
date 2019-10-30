import React, { Component } from 'react';
import * as ml5 from "ml5";
const model = require('./models/dinomodel/manifest.json')

class App extends Component {
  state = {
    rnn: {},
    input: ''
  }

  charRNN = () => {
    this.setState({
      rnn: ml5.charRNN(model, modelLoaded)
    }) 

    function modelLoaded() {
      console.log('Model Loaded!');
    }
  }

  componentDidMount(){
    this.charRNN();
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.rnn)
    this.state.rnn.generate({ seed: this.state.input }, function(err, results) {
      console.log(results);
    });
  }

  render() {
    return (
      <div>
        <h1>Create a Dino name</h1>
        <form onSubmit={this.onSubmit}> 
          <label>Input:
              <input 
                  type="text" 
                  onChange={this.onChange}
                  value={this.state.input}
                  name='input'
                  placeholder='input'
              />
          </label>
          <button>Generate</button>
        </form>
      </div>
    );
  }
}

export default App;