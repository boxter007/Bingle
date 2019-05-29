var min = A[0];
var max = A[0];
for( var  i = 1; i < N; i++ ) {
	if( A[i] < min ) {
		min = A[i];
	}
	if( A[i] > max ) {
		max = A[i];
	}
}
var range = max - min + 1;
var holes = new Array ( range );
for ( var i = 0; i < range; i++ ) {
	holes[i] = [];
}
for ( var i = 0; i < N ; i++ ) {
	holes[ A[i] - min ].push( A[i] );
}
var k = 0;
for ( var i = 0; i < range ; i++ ) {
	for (var j = 0; j < holes[i].length; j++ ) {
		A[k++] = holes[i][j];
	}
}