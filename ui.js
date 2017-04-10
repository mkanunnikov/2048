/**
 * Created by mkanunnikov on 10/04/2017.
 */

let field = new Field(4);


function up(){
	console.log(`up`);
	field.up();
	refresh();
}

function down(){
	console.log(`down`);
	field.down();
	refresh();
}

function left(){
	console.log(`left`);
	field.left();
	refresh();
}

function right(){
	console.log(`right`);
	field.right();
	refresh();
}

function initUi(){
	addEventListener("keydown", function(event) {
	    if (event.keyCode == 38) up();
	    if (event.keyCode == 40) down();
	    if (event.keyCode == 37) left();
	    if (event.keyCode == 39) right();
	});
	refresh();
}

function refresh() {
	console.log(`refresh`);
	for(row of field.rows){
		//console.log(row);
		for(cell of row.cells){
			//console.log(cell);
	    	document.getElementsByName("row")[cell.row].children[cell.column].innerHTML = cell.value;
	    }
	}
}
