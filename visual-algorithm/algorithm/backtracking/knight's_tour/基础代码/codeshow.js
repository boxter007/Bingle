function knightTour(x, y, moveNum) {
	if (moveNum === N*N) {
		return true;
	}
	for (var i = 0; i < 8; i++) {
		var nextX = x + X[i];
		var nextY = y + Y[i];
		if (nextX>=0 && nextX<N && nextY>=0 && nextY<N && board[nextX][nextY]===-1) {
			board[nextX][nextY] = moveNum;
			var nextMoveNum = moveNum + 1;
			if ( knightTour (nextX,nextY, nextMoveNum) === true) {
				return true;
			} else {
				board[nextX][nextY] = -1; 
			}
		} 
	}
	return false;
}