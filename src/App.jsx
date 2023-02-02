import React, { useState } from 'react'
import "./App.css"

import Square from './features/Square/'

export default function Board() {
    const defaultVal = Array(9).fill("");
    const defaultTurn = {
                            isPlayer1: true, 
                        }

    const [squares, setSquares] = useState(defaultVal);
    const [turn, setTurn] = useState(() => defaultTurn);
    
    // event
    function handleClick(event) {
        const target = event.target;
        const name = target.name;
        const isValidTurn = target.innerText.length;

        if (!isValidTurn) {
            let newSquare = [...squares];
            newSquare = newSquare.map((element, idx) => {
                                    const btn = `button-${idx + 1}`
                                    const turns = turn.isPlayer1 ? "X" : "O";

                                    if (btn === name) {
                                        return turns
                                    } 

                                    return element
                                })
            setSquares(() => newSquare);
            setTurn(prevValue => ({
                ...prevValue,
                isPlayer1: !prevValue.isPlayer1,
            }))
        }
    }

    return (
        <>
            <div className='board-row'>
                <Square value={ squares[0] } handleClick={ handleClick } name="1" />
                <Square value={ squares[1] } handleClick={ handleClick } name="2" />
                <Square value={ squares[2] } handleClick={ handleClick } name="3" />
            </div>

            <div className='board-row'>
                <Square value={ squares[3] } handleClick={ handleClick } name="4" />
                <Square value={ squares[4] } handleClick={ handleClick } name="5" />
                <Square value={ squares[5] } handleClick={ handleClick } name="6" />
            </div>

            <div className='board-row'>
                <Square value={ squares[6] } handleClick={ handleClick } name="7" />
                <Square value={ squares[7] } handleClick={ handleClick } name="8" />
                <Square value={ squares[8] } handleClick={ handleClick } name="9" />
            </div>
        </>
      );
}
