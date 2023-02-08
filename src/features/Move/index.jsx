import PrevMove from "./components/PrevMove";

export default function Move({moves, onClick}) {
    const displayMoves = moves.map((move, idx) => {
       return <PrevMove prevMove={ `Go to move #${ idx + 1 }` } onClick={ onClick } idx={ idx } key={ `move-${idx}` }/>
    })

    return (
        <div className='move-display'>
            <ol>
                <PrevMove prevMove={ "Go to game start" } onClick={ onClick } idx={ -1 }/>
                { displayMoves }
            </ol>
    </div>
    )
}