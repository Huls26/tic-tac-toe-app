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
    const defaultMove = [];

    const [squares, setSquares] = useState(defaultVal);
    const [turn, setTurn] = useState(() => defaultTurn);
    const [moves, setMoves] = useState(() => defaultMove);
    
    // event
    function moveTo(idx) {       
        if (idx >= 0 && !calculateWinner(squares)) {
            const move = moves[idx];
            const t = move.turn;
            const m = move.move;

            setSquares(() => [...m])
            setTurn(prev => ({
                ...prev,
                isPlayer1: t,
            }) )
            setMoves(prev => prev.slice(1, idx + 2) )
            return
        }

        if (idx < 0) {
            setTurn(() => defaultTurn)
            setSquares(() => defaultVal)
            setMoves(() => defaultMove)
        }
    }

    function handleClick(event) {
        const target = event.target;
        const name = target.name;
        const isValidTurn = target.innerText.length;
        const isGameover = calculateWinner(squares);

        if (isGameover) {
            setTurn(prev => ({ ...prev, isWinner: true }))
            return 
        }

        if (!isValidTurn) {
            let newSquare = [...squares];
            const t = turn.isPlayer1;
            newSquare = newSquare.map((element, idx) => {
                                    const btn = `button-${idx + 1}`
                                    const turns = t ? "X" : "O";

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
            setMoves(prevValue => ([
                ...prevValue, 
                {
                    move: [...newSquare],
                    turn: !t,
                }
            ]))
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
           <Move onClick={ moveTo } moves={ moves } />
        </div>
      );
}
