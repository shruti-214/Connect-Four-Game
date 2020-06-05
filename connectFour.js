var player1 = {
	name: prompt("Player One: Enter your name, you'll be BLUE."),
	color: 'blue'
};
var player2 = {
	name: prompt("Player Two: Enter your name, you'll be RED."),
	color: 'red'
};
var turn;
var win=false;

if(player1.name!==null && player2.name!==null){
	turn = player1;
	changeInstruction();
	$('.board button').click(clickCell);

}

function checkWin(){
	win=horizontalWin() || verticalWin() || diagonalWin();
}

function changeInstruction(){
	if(!win){
		$('.instruction').text(turn.name+": It's your turn! Pick a column to drop a "+turn.color+" chip.");
	}
	else{
		$('.instruction').text(turn.name+": Congratulations! You've won the game. Refresh the page to play again!");
		//disable buttons
		$('.board button').prop('disabled',true);
	}
}

function getColor(row,col){
	return $('.board tr').eq(row).find('td').eq(col).find('button').css('background-color');
}

function changeColor(row,col){
	var cell = $('.board tr').eq(row).find('td').eq(col).find('button');
	if(turn===player1){
		cell.addClass('turnBlue');
		checkWin();
		if(win) return;
		turn=player2;
	}
	else{
		cell.addClass('turnRed');
		checkWin();
		if(win) return;
		turn=player1;
	}
}

function checkBottom(col){
	var row;
	for(row=5;row>=0;row--){
		var cell = $('.board tr').eq(row).find('td').eq(col).find('button');
		if(!cell.hasClass('turnRed') && !cell.hasClass('turnBlue')){
			break;
		}
	}
	return row;
}

function clickCell(){
	var col = $(this).parent().index();
	//console.log(col);
	var row = checkBottom(col);
	//console.log(row);
	if(row===-1){
		alert("This column is full, pick another!");
	}
	else{
		changeColor(row,col);
	}
	changeInstruction();
}

//$('.board button').click(clickCell);

function colorMatch(one ,two, three, four){
	if(one===two && one===three && one===four && one!==undefined && one!=='rgb(140, 143, 139)'){
		return true;
	}
	return false;
}

function horizontalWin(){
	for(var row=0;row<6;row++){
		for(var col=0;col<4;col++){
			if(colorMatch(getColor(row,col),getColor(row,col+1),getColor(row,col+2),getColor(row,col+3))){
				return true;
			}
		}
	}
	return false;
}

function verticalWin(){
	for(var col=0;col<7;col++){
		for(var row=0;row<3;row++){
			if(colorMatch(getColor(row,col),getColor(row+1,col),getColor(row+2,col),getColor(row+3,col))){
				return true;
			}
		}
	}
	return false;
}

function diagonalWin(){
	for(var row=0;row<6;row++){
		for(var col=0;col<7;col++){
			if(colorMatch(getColor(row,col),getColor(row+1,col+1),getColor(row+2,col+2),getColor(row+3,col+3)))
				return true;
			if(colorMatch(getColor(row,col),getColor(row+1,col-1),getColor(row+2,col-2),getColor(row+3,col-3)))
				return true;
		}
	}
	return false;
}