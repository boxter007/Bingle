var i,j;

// Fill memo table in bottom up manner 
for ( i = 0; i <= m; i++ ) {
	tracer1._wait (0);
	for ( j = 0; j <= n; j++ ) {
		tracer1._wait (1);
		tracer1._wait (2);
		if( i === 0 ) {
			tracer1._wait (3);
			A[i][j] = j;
		} else if ( j === 0 ) {
			tracer1._wait (4);
			A[i][j] = i;
			tracer1._wait (5);
		} else if ( string1[i-1] == string2[j-1] ) {
			tracer1._wait (6);
			tracer1._select ( i-1 )._wait ();
 			tracer2._select ( j-1 )._wait ();
 			tracer3._select ( i-1, j-1 )._wait ();
 			tracer1._wait (7);
			A[i][j] = A[i-1][j-1] + 1;

			tracer1._deselect ( i-1 );
 			tracer2._deselect ( j-1 );
 			tracer3._deselect ( i-1, j-1 );
		} else {
			tracer3._select ( i-1, j )._wait ();
 			tracer3._select ( i, j-1 )._wait ();
			tracer1._wait (9);
			if ( A[i-1][j] < A[i][j-1] ) {
				tracer1._wait (10);
				A[i][j] = 1 + A[i-1][j];
			} else {
				tracer1._wait (12);
				A[i][j] = 1 + A[i][j-1];
			}

			tracer3._deselect ( i-1, j );
 			tracer3._deselect ( i, j-1 );
		}
		tracer3._notify ( i, j , A[i][j] )._wait ();
 		tracer3._denotify( i, j );
	}
}

 logger._print ( '最短公共子序列：' + A[m][n] );
