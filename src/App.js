import React, { Component } from 'react';
import * as ml5 from "ml5";

const modelPath = 'http://localhost:3000/models/dinomodel'

class App extends Component {
  state = {
    rnn: {},
    input: '',
    result: ''
  }

  charRNN = async () => {
    // const rnn = await ml5.charRNN(model, modelLoaded)
    // also does not work:
    const rnn = await ml5.charRNN(modelPath, modelLoaded)
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

  onSubmit = async (event) => {
    event.preventDefault()
    const data = { 
      seed: this.state.input,
      temperature: 0.5,
      length: 20
    }
    const results = await this.state.rnn.generate(data, function(err, results) {
        console.log(results)
        return results
    })
    this.setState({
      result: this.state.input + results.sample
    })
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
          <p>{ this.state.result !== '' ? this.state.result : '' }</p>
        </form>
      </div>
    );
  }
}

export default App;