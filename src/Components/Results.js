import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'

class Results extends Component {
    render() {
        return (
            <Container
                maxWidth="sm"
            >
                <h3>{ !this.props.name.name ? '' : this.props.name.name}</h3>
                <h4>{ !this.props.description.description ? '' : this.props.description.description}</h4>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    name: state.name,
    description: state.description
})

export default connect(mapStateToProps)(Results)