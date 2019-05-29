for ( var i = 0; i < N; i++ ) {
	for ( var j = 0; j <= i; j++ ) {
		if( j === i || j === 0 ) { 
			A[i][j] = 1;
		} else {
			A[i][j] = A[i-1][j-1] + A[i-1][j];
		}
	}
}