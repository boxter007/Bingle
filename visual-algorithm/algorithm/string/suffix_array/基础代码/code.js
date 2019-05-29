word += '$';	//special character
logger._print ('添加特殊字符 \'$\' 到字符串的结尾');
logger._wait(0);
function selectSuffix (word, i) {
	logger._wait(2);
	var c = i;

	while (i < word.length-1) {
		logger._wait(3);
		wordTracer._select (i);
		logger._wait(4);
		i++;
	}
	wordTracer._wait ();

	while (c < word.length-1) {
		logger._wait(6);
		wordTracer._deselect (c);
		logger._wait(7);
		c++;
	}
}

(function createSA (sa, word) {
	for (var i = 0; i < word.length; i++) {
		logger._wait(11);
		logger._wait(12);
		sa [i] [1] = word.slice (i);
		saTracer._notify (i, 1, sa [i] [1])._wait (13);
		selectSuffix (word, i);
		
		saTracer._denotify (i, 1)._wait ();
	}
}) (suffixArray, word);

suffixArray.sort (function (a, b) {
	logger._print ('a [1] (' + a [1] + ') > b [1] (' + b [1] + ') ');
	return a [1] > b [1];
});

for (var i = 0; i < word.length; i++) {
	saTracer._notify (i, 0, suffixArray [i] [0]);
	saTracer._notify (i, 1, suffixArray [i] [1])._wait ();

	saTracer._denotify (i, 0);
	saTracer._denotify (i, 1);
}