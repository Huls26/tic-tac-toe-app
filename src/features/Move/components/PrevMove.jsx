import React from 'react'

export default function PrevMove({prevMove, onClick, idx}) {
  return (
    <li><button className='previous-move' onClick={ () => onClick(idx) } >{ prevMove }</button></li>
  )
}
