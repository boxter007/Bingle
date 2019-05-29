 var i,j;
 for( i = 0; i <= m; i++ ) {
 	for( j = 0; j <= n; j++ ) {
 		if ( i === 0 || j === 0 ) {
 			A[i][j] = 0;
 		} else if ( string1[i-1] == string2[j-1] ) {
 			A[i][j] = A[i-1][j-1] + 1;
 		} else {
 			if( A[i-1][j] > A[i][j-1] ) {
 				A[i][j] = A[i-1][j];
 			} else {
 				A[i][j] = A[i][j-1];
 			}
 		}
 	}
 }
var finalString = '';
i=m;
j=n;
while( i>=1 && j>=1 ) {
	if( string1[i-1] == string2[j-1] ) {
		finalString = string1[i-1] + finalString;
		i--;
		j--;
	} else if( A[i-1][j] > A[i][j-1] ) {
		i--;
	} else {
		j--;
	}
}