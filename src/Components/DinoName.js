import React from 'react'

export default function DinoName(props) {

    const { userName, resultName, onChange, onSubmit } = props

    return (
        <div>
            <h4>Create your dinosaur name:</h4>
            <form onSubmit={onSubmit}> 
                <label>Name:
                    <input 
                        type="text" 
                        onChange={onChange}
                        value={userName}
                        name='userName'
                        placeholder='your name'
                    />
                </label>
                <button>Generate</button>
            </form>
            <p>{ resultName !== '' ? resultName : '' }</p>
        </div>
    )
}

