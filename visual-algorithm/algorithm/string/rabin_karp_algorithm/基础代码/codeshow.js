var N = text.length;
var M = pattern.length;
var hashText = 0; 
var hashPattern = 0; 
var h = 1;
for ( var i = 0; i <  (M - 1); i++ ) {
	h = ( h * D ) % Q;
}
for ( var i = 0; i < M; i++ ) {
	hashPattern = ( D * hashPattern + pattern[i].charCodeAt(0)) % Q;
	hashText = ( D * hashText + text[i].charCodeAt(0)) % Q;
}
for ( var i = 0 ; i <= N-M; i++ ) {
	if ( hashPattern === hashText ) {
		var f = 0;
		for( var j = 0; j < M; j++ ) {
			if ( text[i + j] != pattern[j] ) {
				f++;
			}
		}
	}
	if ( i < N-M ) {
		hashText = ( D * ( hashText - text[i].charCodeAt(0)*h ) + text[ i + M ].charCodeAt(0) ) % Q;
		if ( hashText < 0 ) {
			hashText = hashText + Q;
		}
	}
}