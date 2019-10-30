import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as ml5 from 'ml5';
import DinoName from './DinoName'
import { name } from '../actions'
const dinoNamesModel = 'http://localhost:3000/models/DinoModel'

class DinoNameContainer extends Component {
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
        this.setState({
            nameStatus: 'loading...'
        })
        const data = { 
            seed: this.state.userName,
            temperature: 0.5,
            length: 20
        }
        const results = await this.state.nameModel.generate(data, function(err, results) {
            return results
        })
        this.setState({
            nameStatus: ''
        })
        const dinoName = (this.state.userName + results.sample).toUpperCase()
        this.props.name(dinoName)
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
  
const mapDispatchToProps = { name }
  
export default connect(null, mapDispatchToProps)(DinoNameContainer)