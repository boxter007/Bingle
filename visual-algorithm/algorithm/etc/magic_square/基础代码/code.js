logTracer._wait(0);
var i = Math.floor (n/2);
logTracer._wait(1);
var j = n-1;

for ( var num = 1; num <= n*n; ) {
	logTracer._wait(2);
	logTracer._print ( '(i = ' + i + ' , j = ' + j  + ')');
	logTracer._wait(3);
	if( i == -1 && j == n ) {
		logTracer._wait(4);
		j = n - 2;
		logTracer._wait(5);
		i = 0;
		logTracer._print( '(i = ' + i + ' , j = ' + j  + ')')
	} else {
		logTracer._wait(7);
		if ( j == n ) {
			logTracer._wait(8);
			j = 0;
			logTracer._print ('(i = ' + i + ' , j = ' + j  + ')');
		}
		logTracer._wait(10);
		if ( i < 0 ) {
			logTracer._wait(11);
			i = n-1;
			logTracer._print ( '(i = ' + i + ' , j = ' + j  + ')');
		}
	}
	logTracer._wait(15);
	if ( A[i][j] > 0 ) {
		logTracer._print (' 单元格 ' + '(i = ' + i + ' , j = ' + j  + ')' + '已填充 ');
		logTracer._wait(16);
		j -= 2;
		logTracer._wait(17);
		i++;
		logTracer._print('(i = ' + i + ' , j = ' + j  + ')');
		logTracer._wait(18);
		continue;
	} else {
		logTracer._wait(20);
		A[i][j] = num++;
		tracer._notify( i, j, A[i][j] )._wait ();
		tracer._denotify ( i, j );
		tracer._select ( i, j )._wait ();
	}
	logTracer._wait(22);
	j++;
	logTracer._wait(23);
	i--;
}