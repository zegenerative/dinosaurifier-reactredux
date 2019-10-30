import React, { Component } from 'react';
import * as ml5 from "ml5";
import * as model from './models/dinomodel/manifest.json'
// const model = require('./models/dinomodel')

class App extends Component {
  state = {
    rnn: {},
    input: ''
  }

  charRNN = async () => {
    const rnn = await ml5.charRNN('http://localhost:3000/src/models/dinomodel/', modelLoaded)
    // also does not work:
    // const rnn = await ml5.charRNN('http://localhost:3000/src/models/dinomodel', modelLoaded)
    this.setState({
      rnn,
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
    console.log(model.default)
    event.preventDefault()
    console.log(this.state.rnn)
    // this.state.rnn.generate({ seed: this.state.input }, function(err, results) {
    //   console.log(results);
    // });
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