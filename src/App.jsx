import React, { useState, useEffect } from 'react'
import "./App.css"

import Square from './features/Square/'

export default function Board() {
    const defaultVal = Array(9).fill(null);
    const defaultTurn = {
                            isPlayer1: true, 
                        }

    const [squares, setSquares] = useState(defaultVal);
    const [turn, setTurn] = useState(() => defaultTurn);
    

    function handleClick(idx) {
        setSquares(prevValue => {
            const newSquare = [...prevValue];
            let value = newSquare[idx];

            if (!value) {
                newSquare[idx] = turn.isPlayer1 ? "X" : "O";
            }

            return newSquare
        })
        setTurn(prevValue => ({ isPlayer1: !prevValue.isPlayer1 }))    
    }

    return (
        <>
            <div className='board-row'>
                <Square value={ squares[0] } handleClick={ () => handleClick(0) } />
                <Square value={ squares[1] } handleClick={ () => handleClick(1) } />
                <Square value={ squares[2] } handleClick={ () => handleClick(2) } />
            </div>

            <div className='board-row'>
                <Square value={ squares[3] } handleClick={ () => handleClick(3) } />
                <Square value={ squares[4] } handleClick={ () => handleClick(4) } />
                <Square value={ squares[5] } handleClick={ () => handleClick(5) } />
            </div>

            <div className='board-row'>
                <Square value={ squares[6] } handleClick={ () => handleClick(6) } />
                <Square value={ squares[7] } handleClick={ () => handleClick(7) } />
                <Square value={ squares[8] } handleClick={ () => handleClick(8) } />
            </div>
        </>
      );
}
