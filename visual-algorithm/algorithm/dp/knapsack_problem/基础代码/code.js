
for ( var i = 0; i <= N; i++ ) {
	tracer._wait(0);
	for( var j = 0; j <= W; j++ ) {
		tracer._wait(1);
		tracer._wait(2);
		if( i === 0 || j === 0 ) { 
			/*
			If we have no items or maximum weight we can take in collection is 0 
			then the total weight in our collection is 0
			*/
			tracer._wait(3);
			DP[i][0] = 0;
			tracer._notify( i, j, DP[i][j])._wait();
			tracer._denotify( i, j);
		} else if ( wt[i-1] <= j ) { // take the current item in our collection
			tracer._wait(4);
			dataViewer1._select(i-1)._wait();
			dataViewer2._select(i-1)._wait();
			tracer._select( i-1, j)._wait();

			var A = val[i - 1] + DP[i - 1][j - wt[i - 1]];
			tracer._wait(5);
			var B = DP[i - 1][j];
			tracer._wait(6);
			/*
			find the maximum of these two values
			and take which gives us a greater weight
			 */
			 tracer._wait(7);
			if (A > B) {
				DP[i][j] = A;
				tracer._notify( i, j, DP[i][j])._wait(8);
			} else {
				DP[i][j] = B;
				tracer._notify( i, j, DP[i][j])._wait(9);
			}

			tracer._deselect( i-1, j);
			tracer._denotify( i, j);
			dataViewer2._deselect(i-1);
			dataViewer1._deselect(i-1);

		} else { // leave the current item from our collection 

			DP[i][j] = DP[i - 1][j];
			tracer._notify( i, j, DP[i][j])._wait(13);
			tracer._denotify( i, j);
		}
	}
}

logger._print('  背包里能够装下的最大价值：' + DP[N][W]);
