import React, { useState } from 'react'
import "./App.css"

import Square from './features/Square/'

export default function Board() {
    const defaultVal = Array(9).fill("");
    const defaultTurn = {
                            isPlayer1: true, 
                            isWinner: false,
                        }

    const [squares, setSquares] = useState(defaultVal);
    const [turn, setTurn] = useState(() => defaultTurn);
    
    // helper function
    //calculateWinner
    function calculateWinner(array) {
        const makeArray = [...array];

        // set row
        const row = setRow(makeArray);
        const horizontal = setHorizontal(row);
        const diagonal = setDiagonal(makeArray);
        const setOutcome = [row, horizontal, diagonal];

       return setOutcome.reduce((w, array) => {
            const isWinner = declareWinner(array);

            return isWinner ? isWinner : w
        }, null)
    }

    function declareWinner(array) {
        return [...array].reduce((winner, element) => {
            const raw = element.join("");
            
            if (raw.length > 2) {
                const unique = new Set(raw);
                
                if (unique.size === 1) {
                    const w = unique.values();

                    return w.next().value
                }
            }

            return winner
        }, null)
    }

    // set diagonal 
    function setDiagonal(array) {
        return array.reduce((diagonal, current, idx) => {
            const rSlant = idx % 4 === 0;
            const lSlant = idx % 2 === 0 && (idx > 0 && idx < array.length - 1);

            if (rSlant) {
                const newDiagonal = [...diagonal];
                const slant = diagonal[0];
                const getDig = slant ? [...slant, current] : [current];
                diagonal[0] = getDig;
            } 

            if (lSlant) {
                const newDiagonal = [...diagonal];
                const slant = diagonal[1];
                const getDig = slant ? [...slant, current] : [current];
                diagonal[1] = getDig;
            }

            return diagonal
        }, [])
    }

    // set horizontal
    function setHorizontal(array) {
        return array.reduce((horizontal, current, idx) => {
            let setHorizontal = [...horizontal];

            for (const index in current) {
                const currentItem = current[index];

                if (!horizontal[index]) {
                    setHorizontal = [...setHorizontal, [currentItem]];
                } else {
                    const getElement = setHorizontal[index];
                    getElement[idx] = currentItem;
                }
            }

            return setHorizontal
        }, [])
    }
 
    // set row
    function setRow(array) {
        return array.reduce((row, current, idx) => {
            const currentRowIdx = row.length - 1;

            if (idx % 3 === 0) {
                return [...row, [current]]
            } else {
                const setRow = row[currentRowIdx];
                setRow.push(current);

                return row
            }
        }, [])
    }

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
        <div className='board'>
            <p className='status'>{ statusPlayer }</p>
            { squaresMap }
        </div>
      );
}
