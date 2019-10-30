export const name = (name) => {
    return {
        type: 'NAME',
        payload: {
            name,
        }
    }
}

export const description = (description) => {
    return {
        type: 'DESCRIPTION',
        payload: {
            description,
        }
    }
}
