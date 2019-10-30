import React from 'react'

export default function DinoDescription(props) {

    const { descriptionStatus, resultDescription, onClick } = props

    return (
        <div>
            <h4>Create a description of your species:</h4>
            <p>{descriptionStatus}</p>
            <button onClick={onClick}>Generate</button>
            <p>{resultDescription}</p>
        </div>
    )
}
