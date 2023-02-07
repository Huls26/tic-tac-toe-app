export default function calculateWinner(array) {
    const makeArray = [...array];

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