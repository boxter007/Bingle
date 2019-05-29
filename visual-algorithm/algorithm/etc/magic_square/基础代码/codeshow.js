var i = Math.floor (n/2);
var j = n-1;
for ( var num = 1; num <= n*n; ) {
	if( i == -1 && j == n ) {
		j = n - 2;
		i = 0;
	} else {
		if ( j == n ) {
			j = 0;
		}
		if ( i < 0 ) {
			i = n-1;
		}
	}

	if ( A[i][j] > 0 ) {
		j -= 2;
		i++;
		continue;
	} else {
		A[i][j] = num++;
	}
	j++;
	i--;
}