import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {


  const makeSushiDiv = () => {
    // console.log(` props.sushi: ${props.fourSushi}`)
    return props.fourSushi.map(sushi => {
      return <div>< Sushi eatSushi={props.eatSushi} key={sushi.id} sushi={sushi}/></div>
    })
  }

  return (
    <Fragment>
      <div className="belt">
        {makeSushiDiv()}
        <MoreButton getFourSushi={props.getFourSushi} allSushi={props.allSushi}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer