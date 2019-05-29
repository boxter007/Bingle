for ( var i = 0; i <= N; i++ ) {
	for( var j = 0; j <= W; j++ ) {
		if( i === 0 || j === 0 ) { 
			DP[i][0] = 0;
		} else if ( wt[i-1] <= j ) { 
			var A = val[i - 1] + DP[i - 1][j - wt[i - 1]];
			var B = DP[i - 1][j];		
			if (A > B) {
				DP[i][j] = A;
			} else {
				DP[i][j] = B;
			}
		} else { 
			DP[i][j] = DP[i - 1][j];
		}
	}
}

logger._print(' 背包里能够装下的最大价值：' + DP[N][W]);
