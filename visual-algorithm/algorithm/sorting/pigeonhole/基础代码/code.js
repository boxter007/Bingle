tracer1._wait(0);
var min = A[0];
tracer1._wait(1);
var max = A[0];
for( var  i = 1; i < N; i++ ) {
	tracer1._wait(2);
	tracer1._wait(3);
	if( A[i] < min ) {
		tracer1._wait(4);
		min = A[i];
	}
	tracer1._wait(6);
	if( A[i] > max ) {
		tracer1._wait(7);
		max = A[i];
	}
}
tracer1._wait(10);
var range = max - min + 1;
tracer1._wait(11);
var holes = new Array ( range );
for ( var i = 0; i < range; i++ ) {
	tracer1._wait(12);
	tracer1._wait(13);
	holes[i] = [];
}
tracer2._setData( holes );
for ( var i = 0; i < N ; i++ ) {
	tracer1._select ( i )._wait (15);
	tracer1._wait(16);
	holes[ A[i] - min ].push( A[i] );
	tracer2._setData( holes );
	tracer1._deselect ( i );
}
tracer1._wait(18);
var k = 0;
for ( var i = 0; i < range ; i++ ) {
	tracer1._wait(19);
	for (var j = 0; j < holes[i].length; j++ ) {
		tracer2._select ( i, j )._wait (20);
		A[k++] = holes[i][j];
		tracer1._notify ( k-1, A[k-1] )._wait (21);
		tracer2._deselect ( i, j );
		tracer1._denotify ( k-1 );
	}
}