word += '$';	
function selectSuffix (word, i) {
	var c = i;
	while (i < word.length-1) {
		i++;
	}
	while (c < word.length-1) {
		c++;
	}
}
(function createSA (sa, word) {
	for (var i = 0; i < word.length; i++) {
		sa [i] [1] = word.slice (i);
		selectSuffix (word, i);
	}
}) (suffixArray, word);
suffixArray.sort (function (a, b) {
	return a [1] > b [1];
});