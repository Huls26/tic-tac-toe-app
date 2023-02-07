import React, { useState } from 'react'
import "./App.css"

import calculateWinner from "./utils/calculateWinner"
import Square from './features/Square/'
import Move from './features/Move/'
import Squares from './features/Squares/'

export default function Board() {
    const defaultVal = Array(9).fill("");
    const defaultTurn = {
                            isPlayer1: true, 
                            isWinner: false,
                        }

    const [squares, setSquares] = useState(defaultVal);
    const [turn, setTurn] = useState(() => defaultTurn);
    
    // event
    function handleClick(event) {
        const target = event.target;
        const name = target.name;
        const isValidTurn = target.innerText.length;
        const isGameover = calculateWinner(squares);

        if (isGameover) {
            return 
        }

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

    // render 
    const squaresMap = squares.map((element, idx) => {
        return <Square key={ idx } value={ squares[idx] } handleClick={ handleClick } name={ idx + 1} />;
    })

    const gameover = calculateWinner(squares) ? `Winner ${ calculateWinner(squares) }` : null;
    const playerTurn = turn.isPlayer1 ? "X" : "O";
    const statusPlayer = gameover ? gameover : `Next player: ${ playerTurn }`

    return (
        <div className='board-display'>
           <Squares statusPlayer={ statusPlayer } squaresMap={ squaresMap } />
           <Move />
        </div>
      );
}
