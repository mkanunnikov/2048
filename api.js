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
        this.rows = Array(size);

        for (let columnIndex = 0; columnIndex < size; columnIndex++) {
            let row = new Row();
            for (let rowIndex = 0; rowIndex < size; rowIndex++) {
                // this.cells[column][row] = new Cell(column,row);
                let cell = new Cell(columnIndex, rowIndex);
                console.log(`new cell value = ${cell.value}`);
                row.put(cell);
                // this.columns[columnIndex] =
            }
            this.rows.push(row);
            console.log(row);
        }
    }

    left() {
        this.rows.forEach((row)=>row.left());
    }

    right(){
        this.rows.forEach((row)=>row.right());
    }

    up(){
        this.rows.forEach((row)=>row.up());
    }

    down(){
        this.rows.forEach((row)=>row.down());
    }
}

let init = function (size) {
    console.log('Start');
    this.field = new Field(size);

    // let row = new Row([0, 4, 2, 4, 0, 0, 2, 2, 2, 0, 0, 4, 4, 2, 0, 2].map(
    //     (value, column) => {
    //         return new Cell(column, 0, value);
    //     }
    // ));
    console.log(this.field.rows[0].toString());
    // row.right();
    // console.log(row.toString());

};

let left = function () {
    this.field.left();
};