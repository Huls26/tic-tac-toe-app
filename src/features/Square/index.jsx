import React, { useState } from 'react'

export default function Square({value, handleClick, name}) {
    return (
       <button className="square" onClick={ handleClick }>{ value }</button>
    )
}
