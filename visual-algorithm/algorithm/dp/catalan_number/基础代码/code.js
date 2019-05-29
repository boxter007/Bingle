A[0] = 1;
tracer._notify ( 0, A[0] );
tracer._denotify ( 0 );
tracer._wait(0);
A[1] = 1;
tracer._notify ( 1, A[1] );
tracer._denotify ( 1 );
tracer._wait(1);
for (var i = 2; i <= N; i++) {
	tracer._wait(2);
	for (var j = 0; j < i; j++) {
		tracer._wait(3);
		A[i] += A[j] * A[i-j-1];
		tracer._select( j )._wait(4);
		tracer._select( i - j -1 )._wait();
		tracer._notify( i, A[i])._wait();
		tracer._deselect( j );
		tracer._deselect( i - j - 1 );
		tracer._denotify( i );
	}
}
logger._print ( '第' + N  + '位卡特兰数是：' + A[N] );
tracer._select( N );