function knightTour(x, y, moveNum) {
	if (moveNum === N*N) {logTracer._wait(1);
		logTracer._wait(1);return true;
	}
	logTracer._wait(4);
	for (var i = 0; i < 8; i++) {
		logTracer._wait(5);
		var nextX = x + X[i];
		logTracer._wait(6);
		var nextY = y + Y[i];
		
		posTracer._notify ( 0, nextX)._wait ();
		posTracer._notify ( 1, nextY)._wait (7);
		posTracer._denotify (0);
		posTracer._denotify (1);
		/*
		Check if knight is still in the board
		Check that knight does not visit an already visited square
		*/
		if (nextX>=0 && nextX<N && nextY>=0 && nextY<N && board[nextX][nextY]===-1) {
			board[nextX][nextY] = moveNum;
			
			logTracer._print ('移动到（' + nextX + ',' + nextY + '）');
			boardTracer._notify ( nextX, nextY, moveNum)._wait(8);
			boardTracer._denotify( nextX, nextY);
			boardTracer._select ( nextX, nextY);
			
			var nextMoveNum = moveNum + 1;
			logTracer._wait(9);
			logTracer._wait(10);
			if ( knightTour (nextX,nextY, nextMoveNum) === true) {
				logTracer._wait(11);
				return true;
			} else {
				logTracer._print ('从（' + nextX + ',' +nextY + '）无法移动: 回退到上一步');
				board[nextX][nextY] = -1; // backtrack 
				boardTracer._notify ( nextX, nextY, -1)._wait(13);
				boardTracer._denotify( nextX, nextY);
				boardTracer._deselect( nextX, nextY);
			}
		} logTracer._wait(15);
		//else {
		//	logTracer._print (nextX + ',' + nextY + ' is not a valid move');
		//}
	}
	logTracer._wait(17);
	return false;
}

board[0][0] = 0; // start from this position
pos[0] = 0;
pos[0] = 0;

boardTracer._notify ( 0, 0, 0)._wait();
posTracer._notify ( 0, 0)._wait ();
posTracer._notify ( 1, 0)._wait ();
boardTracer._denotify( 0, 0);
boardTracer._denotify( 0, 0);
posTracer._denotify (0);
posTracer._denotify (1);

if (knightTour ( 0, 0, 1) === false ) {
	logTracer._print ('方案未找到');
} else {
	logTracer._print ('找到解决方案');
}
