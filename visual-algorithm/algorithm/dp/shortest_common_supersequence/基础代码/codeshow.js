for (var i = 0; i <= m; i++ ) {
	for (var j = 0; j <= n; j++ ) {
		if( i === 0 ) {
			A[i][j] = j;
		} else if ( j === 0 ) {
			A[i][j] = i;
		} else if ( string1[i-1] == string2[j-1] ) {
			A[i][j] = A[i-1][j-1] + 1;
		} else {
			if ( A[i-1][j] < A[i][j-1] ) {
				A[i][j] = 1 + A[i-1][j];
			} else {
				A[i][j] = 1 + A[i][j-1];
			}
		}
	}
}