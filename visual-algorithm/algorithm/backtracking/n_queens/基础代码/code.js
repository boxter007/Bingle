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
	logger._print ('开始新的迭代，当前皇后：' + currentQueen +  ' ， 当前列： ' + currentCol);
	logger._print ('------------------------------------------');
	queenTracer._wait(10);
	if (currentQueen >= N) {
		logger._print ('递归完成！找到所有皇后！');
		queenTracer._wait(11);
		return true;
	}
	queenTracer._wait(13);
	var found = false, row = 0;
	while ( (row < N) && (!found) ) {
		queenTracer._wait(14);
		boardTracer._select (row, currentCol)._wait ();
		logger._print ('（' + currentCol + ',' + row + '）尝试第' + currentQueen + '个皇后');
		queenTracer._wait(15);
		if (validState (row, currentCol, currentQueen)) {
			
			queens [currentQueen] [0] = row;
			
			queens [currentQueen] [1] = currentCol;
			queenTracer._wait(16);
			queenTracer._wait(17);
			queenTracer._notify (currentQueen, 0, currentCol)._wait ();
			queenTracer._notify (currentQueen, 1, row)._wait ();
			queenTracer._denotify (currentQueen, 0)._wait ();
			queenTracer._denotify (currentQueen, 1)._wait ();

			queenTracer._wait(18);
			found = nQ (currentQueen + 1, currentCol + 1);
			queenTracer._wait(19);
		}

		if (!found) {
			boardTracer._deselect (row, currentCol)._wait ();
			logger._print ('（' + currentCol + ',' + row + '）不正确，继续查找。');
		}
		queenTracer._wait(20);
		row++;
		queenTracer._wait(21);
	}
	queenTracer._wait(22);
	return found;
}

logger._print ('开始');
nQ (0, 0);
logger._print ('完成');