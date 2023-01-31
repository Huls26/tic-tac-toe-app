import React, { useState } from 'react'

export default function Square({value, handleClick, name}) {
    return (
       <button name={ `button-${name}` } className="square" onClick={ handleClick }>{ value }</button>
    )
}
