import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

export default function DinoName(props) {

    const { userName, onChange, onSubmit, nameStatus } = props

    return (
        <div>
            <h4>Create your dinosaur name:</h4>
            <p>{nameStatus}</p>
            <form onSubmit={onSubmit}> 
                <label>
                    <input 
                        type="text" 
                        onChange={onChange}
                        value={userName}
                        name='userName'
                        placeholder='your name'
                    />
                </label>
                <button>
                    <h3>
                    Generate
                    </h3>
                </button>
            </form>
        </div>
    )
}

