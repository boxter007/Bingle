function validState (row, col, currentQueen) {
	for (var q = 0; q < currentQueen; q++) {
		var currentQ = queens [q];
		if ( row === currentQ [0] || col === currentQ [1] || ( Math.abs(currentQ [0] - row) === Math.abs(currentQ [1] - col)) ) {
			return false;
		}
	}
	return true;
}
function nQ (currentQueen, currentCol) {
	if (currentQueen >= N) {
		return true;
	}
	var found = false, row = 0;
	while ( (row < N) && (!found) ) {
		if (validState (row, currentCol, currentQueen)) {
			queens [currentQueen] [0] = row;
			queens [currentQueen] [1] = currentCol;
			found = nQ (currentQueen + 1, currentCol + 1);
		}
		row++;
	}
	return found;
}
nQ (0, 0);