/**
 * Created by mkanunnikov on 06/04/2017.
 */
class Cell {
    constructor(column, row, value = 0) {
        this.column = column;
        this.row = row;
        this.value = value;
    }

    set(value) {
        this.value = value;
    }

    equals(value) {
        return value === this.value;
    }
}

class Row {
    constructor(cells) {
        this.cells = cells;
    }

    put(cell) {
        this.cells.push(cell);
    }

    left() {
        (new Row(...this.cells.reverse())).right();
    }

    right() {
        const newValues = this.cells.map(() => {
            let value = 0;
            const firstCell = this.first();
            // console.log(`fistIndex = ${firstCell}`);
            if (firstCell) {
                value = firstCell.value;
                firstCell.value = 0;
                const secondCell = this.first();
                if (secondCell) {
                    const second = secondCell.value;
                    if (value === second) {
                        value += second;
                        secondCell.value = 0;
                    }
                }
            }
            // console.log(`value = ${value}`);
            return value;
        });
        // console.log(...newValues);
        this.cells.forEach((cell, index) => {
            cell.value = newValues[index];
        });
    }

    up(){}
    
    down(){}

    first() {
        return this.cells.find(cell => cell.value > 0);
    }

    getSum() {
        return this.cells.map(cell => cell.value).reduce((prev, curr) => prev + curr);
    }

    getZeroCount() {
        return this.cells.map(cell => cell.value).reduce((prev, curr) => {
            prev += curr === 0;
            return prev;
        }, 0);
    }

    toString() {
        let string = '';
        // this.cells.map(cell=>string += cell.value+", ");
        this.cells.map(cell => string += cell.value + " , ");
        return string;
    }

}
class Field {
    constructor(size) {
        // this.columns = Array(size);
        this.rows = [];

        for (let columnIndex = 0; columnIndex < size; columnIndex++) {
            let row = [];
            for (let rowIndex = 0; rowIndex < size; rowIndex++) {
                row.push(new Cell(columnIndex, rowIndex));
            }
            
      //      console.log(...row);
            this.rows.push(new Row(row));
        }
        this.random();
    }

    left() {
        this.rows.forEach((row)=>row.left());
        return this.random();
    }

    right(){
        this.rows.forEach((row)=>row.right());
        return this.random();
    }

    up(){
        this.rows.forEach((row)=>row.up());
        return this.random();
    }

    down(){
        this.rows.forEach((row)=>row.down());
        return this.random();
    }

    random(){
        let zeroCells = this.rows.reduce((all,row)=>{return all.concat(row.cells.filter(cell=>cell.value===0))},[]);
        if(zeroCells.length>0){
           let randomIndex = Math.random()*(zeroCells.length-1);
           let fixedIndex = randomIndex.toFixed();
           zeroCells[fixedIndex].value = 2;
        }
        return zeroCells.length>0;
    }
}

/*
let init = function (size) {
    console.log('Start');
    let field = new Field(size);
    return field;
};
*/
