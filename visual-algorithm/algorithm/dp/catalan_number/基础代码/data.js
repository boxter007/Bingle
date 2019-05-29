var N = 10;
var A = new Array ( N+1 );
for (var i = N; i >= 0; i--) {
	A[i] = 0;
}

var tracer = new Array1DTracer( ' 卡塔兰数 ')._setData( A );
var logger = new LogTracer('控制台');