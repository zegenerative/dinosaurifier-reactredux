import React, { Component } from 'react'
import * as ml5 from 'ml5';
import DinoName from './DinoName'
const dinoNamesModel = 'http://localhost:3000/models/DinoModel'

export default class DinoNameContainer extends Component {
    state = {
        nameModel: {},
        userName: '',
        resultName: '',
        nameStatus: '',
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

    componentDidMount(){
        this.nameModel()
    }
    
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = async (event) => {
        event.preventDefault()
        this.state.nameStatus = 'loading...'
        const data = { 
            seed: this.state.userName,
            temperature: 0.5,
            length: 20
        }
        const results = await this.state.nameModel.generate(data, function(err, results) {
            return results
        })
        this.setState({
            resultName: (this.state.userName + results.sample).toUpperCase(),
            nameStatus: ''
        })
    }

    render() {
        return (
            <div>
                <DinoName
                    userName={this.state.userName}
                    resultName={this.state.resultName}
                    nameStatus={this.state.nameStatus}
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                />
            </div>
        )
    }
}
