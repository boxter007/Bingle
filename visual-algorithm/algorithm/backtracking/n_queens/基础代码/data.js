var N = 4;	//just change the value of N and the visuals will reflect the configuration!
var board = (function createArray (N) {
	var result = [];
	for (var i = 0; i < N; i++) {
		result [i] = Array.apply(null, Array(N)).map(Number.prototype.valueOf,0);
	}
	return result;
}) (N);
var queens = (function qSetup (N) {
	var result = [];
	for (var i = 0; i < N; i++) {
		result [i] = [-1,-1];
	}
	return result;
}) (N);

var boardTracer = new Array2DTracer ('棋盘'),
	queenTracer = new Array2DTracer ('皇后位置'),
	logger = new LogTracer ('控制台');

boardTracer._setData (board);
queenTracer._setData (queens);
logger._print (N + '皇后: ' + N + 'X' + N + '棋盘, ');