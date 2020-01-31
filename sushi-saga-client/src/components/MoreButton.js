import React from 'react'

const MoreButton = (props) => {
    return <button onClick={() => props.getFourSushi()}>
            More sushi!
          </button>
}

export default MoreButton