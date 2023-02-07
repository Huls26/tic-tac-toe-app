import React from 'react'

export default function Squares({statusPlayer, squaresMap}) {
  return (
    <div className='board'>
        <p className='status'>{ statusPlayer }</p>
        { squaresMap }
    </div>
  )
}
