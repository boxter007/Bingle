var N = text.length;
var M = pattern.length;

var hashText = 0; //hash value for text
var hashPattern = 0; //hash value for pattern
var h = 1;
logger._wait(0);
logger._wait(1);
logger._wait(2);
logger._wait(3);
logger._wait(4);

for ( var i = 0; i <  (M - 1); i++ ) {
	logger._wait(5);
	logger._wait(6);
	h = ( h * D ) % Q;
}

for ( var i = 0; i < M; i++ ) {
	logger._wait(8);
	logger._wait(9);
	hashPattern = ( D * hashPattern + pattern[i].charCodeAt(0)) % Q;
	logger._wait(10);
	hashText = ( D * hashText + text[i].charCodeAt(0)) % Q;
}

for ( var i = 0 ; i <= N-M; i++ ) {
	logger._wait(12);
	/*
	Check if hash values of current window of text matches 
	with hash values of pattern. If match is found then 
	check for characters one by one
	*/
	logger._wait(13);
	if ( hashPattern === hashText ) {
		var f = 0;
		tracer1._select( i, i + M );
		tracer2._select( 0, M - 1 )._wait(14);
		for( var j = 0; j < M; j++ ) {

			tracer1._notify( i + j )._wait(15);
			tracer2._notify( j )._wait(16);
			if ( text[i + j] != pattern[j] ) {
				logger._wait(17);
				f++;
			}
			tracer1._denotify( i + j );
			tracer2._denotify( j );
		}

		if( f === 0 ) {
			logger._print( ' 在位置 ' + i  + ' 找到子串');
		}
		tracer1._deselect( i, i + M );
		tracer2._deselect( 0, M - 1 );
	}

	/*
	Calculate hash value for next window of text :
	*/
	logger._wait(21);
	if ( i < N-M ) {
		logger._wait(22);
		hashText = ( D * ( hashText - text[i].charCodeAt(0)*h ) + text[ i + M ].charCodeAt(0) ) % Q;

		// Convert negative value of hashText (if found) to positive
		logger._wait(23);
		if ( hashText < 0 ) {
			logger._wait(24);
			hashText = hashText + Q;
		}
	}
}