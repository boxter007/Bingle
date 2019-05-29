var word = 'virgo';
var suffixArray = (function skeleton (word) {
	var arr = [];
	for (var i = 1; i <= word.length+1; i++) {
		arr.push ([i, '-']);
	}
	return arr;
}) (word);
var saTracer = new Array2DTracer ('后缀数组'),
	wordTracer = new Array1DTracer ('给定字符'),
	logger = new LogTracer ('控制台');
saTracer._setData (suffixArray);
wordTracer._setData (word);