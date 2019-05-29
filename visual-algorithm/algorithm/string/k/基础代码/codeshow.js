Number.prototype.mod = function (n) {
    return ((this%n)+n)%n;
};
function tracker (substring) {
	var i = 1, j = 0;
	substrTracer._select (j);
	while (i < track.length) {
		substrTracer._select (i)._wait ();
		while ( (substring [i] !== substring [j]) && (j > 0) ) {
			j = track [j-1];
		}
		if (substring [i] === substring [j]) {
			track [i] = ++j;
		}
		else {
			track [i] = 0;
		}
		i++;
	}
	return track;
}
function kmp (string, substr) {
	var positions = [], j = 0, startPos;
	track = tracker (substr);
	for (var i = 0; i < string.length; i++) {
		if (string [i] === substr [j]) {
			if (j === substr.length-1) {
				startPos = i - substr.length + 1;
				positions.push (startPos);
			}
			else {
				j++;
			}
		}
		else {
			var tempJ = j - 1;
			j = track [(j-1).mod (substr.length)];	
		}
	}
	return positions;
}
var positions = kmp (string, substring);