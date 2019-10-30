import React, { Component } from 'react'
import { connect } from 'react-redux'
import { description } from '../actions'
import * as ml5 from 'ml5'
import DinoDescription from './DinoDescription'
const dinoDescriptionsModel = 'http://localhost:3000/models/DinoDescriptionModel'

class DinoDescriptionContainer extends Component {
    state = {
        descriptionModel: {},
        resultDescription: '',
        descriptionStatus: ''
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
      
    componentDidMount() {
        this.descriptionModel()
    }

    onClick = async () => {
        this.setState({
            descriptionStatus: 'loading...'
        })
        const data = { 
          seed: this.state.resultName,
          temperature: 0.5,
          length: 300
        }
        const results = await this.state.descriptionModel.generate(data, function(err, results) {
            return results
        })
        this.setState({
          descriptionStatus: ''
        })
        this.props.description(results.sample)
    }

    render() {
        return (
            <div>
                <DinoDescription 
                    resultDescription={this.state.resultDescription}
                    descriptionStatus={this.state.descriptionStatus}
                    onClick={this.onClick}
                />
            </div>
        )
    }
}

const mapDispatchToProps = { description }
  
export default connect(null, mapDispatchToProps)(DinoDescriptionContainer)