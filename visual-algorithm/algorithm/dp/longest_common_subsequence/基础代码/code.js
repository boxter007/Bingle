var i,j;
logger._wait(0);
// Build the memo table in bottom up fashion 
 for( i = 0; i <= m; i++ ) {
 	logger._wait(1);
 	for( j = 0; j <= n; j++ ) {
 		logger._wait(2);
 		logger._wait(3);
 		if ( i === 0 || j === 0 ) {
 			logger._wait(4);
 			A[i][j] = 0;
 		} else if ( string1[i-1] == string2[j-1] ) {
 			tracer1._select ( i-1 )._wait (5);
 			tracer2._select ( j-1 )._wait ();
 			tracer3._select ( i-1, j-1 )._wait (6);
 			
 			A[i][j] = A[i-1][j-1] + 1;
 			
 			tracer1._deselect ( i-1 );
 			tracer2._deselect ( j-1 );
 			tracer3._deselect ( i-1, j-1 );
 		} else {
 			tracer3._select ( i-1, j )._wait (7);
 			tracer3._select ( i, j-1 )._wait (8);
 			
 			if( A[i-1][j] > A[i][j-1] ) {
 				logger._wait(9);
 				A[i][j] = A[i-1][j];
 			} else {
 				logger._wait(10);
 				A[i][j] = A[i][j-1];
 				logger._wait(11);
 			}
 			
 			tracer3._deselect ( i-1, j );
 			tracer3._deselect ( i, j-1 );
 		}
 		tracer3._notify ( i, j , A[i][j] )._wait ();
 		tracer3._denotify( i, j );
 	}
 }
logger._wait(16);
var finalString = '';
logger._wait(17);
i=m;
logger._wait(18);
j=n;
while( i>=1 && j>=1 ) {
	logger._wait(19);
	tracer3._select ( i, j )._wait (20);
	if( string1[i-1] == string2[j-1] ) {
		tracer1._select ( i-1 )._wait (21);
 		tracer2._select ( j-1 )._wait (22);
 		
		finalString = string1[i-1] + finalString;
		i--;
		logger._wait(23);
		j--;
	} else if( A[i-1][j] > A[i][j-1] ) {
		logger._wait(24);
		i--;
		logger._wait(25);
	} else {
		j--;
		logger._wait(27);
	}
}

logger._print ( '最长公共子序列的长度是：' + A[m][n] );
logger._print ( '最长公共子序列为：' + finalString );