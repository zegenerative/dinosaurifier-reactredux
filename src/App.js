import React, { Component } from 'react';
import * as ml5 from "ml5";

const dinoNamesModel = 'http://localhost:3000/models/DinoModel'
const dinoDescriptionsModel = 'http://localhost:3000/models/DinoDescriptionModel'

class App extends Component {
  state = {
    nameModel: {},
    descriptionModel: {},
    input: '',
    resultName: '',
    resultDescription: ''
  }

  nameModel = async () => {
    const nameModel = await ml5.charRNN(dinoNamesModel, nameModelLoaded)
    this.setState({
      nameModel,
    }) 

    function nameModelLoaded() {
      console.log('Name model loaded!');
    }
  }

  descriptionModel = async () => {
    const descriptionModel = await ml5.charRNN(dinoDescriptionsModel, descriptionModelLoaded)
    this.setState({
      descriptionModel,
    }) 

    function descriptionModelLoaded() {
      console.log('Description model loaded!');
    }
  }

  componentDidMount(){
    this.nameModel()
    this.descriptionModel()
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
    const results = await this.state.nameModel.generate(data, function(err, results) {
        return results
    })
    this.setState({
      resultName: (this.state.input + results.sample).toUpperCase()
    })
  }

  onClick = async () => {
    const data = { 
      seed: this.state.input,
      temperature: 0.01,
      length: 300
    }
    const results = await this.state.descriptionModel.generate(data, function(err, results) {
        return results
    })
    this.setState({
      resultDescription: results.sample
    })
  }

  render() {
    return (
      <div>
        <div>
          <h1>THE DINOSAURIFIER</h1>
          <h4>Create your dinosaur name:</h4>
          <form onSubmit={this.onSubmit}> 
            <label>Name:
                <input 
                    type="text" 
                    onChange={this.onChange}
                    value={this.state.input}
                    name='input'
                    placeholder='your first name'
                />
            </label>
            <button>Generate</button>
            <p>{ this.state.resultName !== '' ? this.state.resultName : '' }</p>
          </form>
        </div>
        <div>
          <h4>Create a description:</h4>
          <p>{this.state.resultDescription}</p>
          <button onClick={this.onClick}>Generate</button>
        </div>
      </div>
    );
  }
}

export default App;