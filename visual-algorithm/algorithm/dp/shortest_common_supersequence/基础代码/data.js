var string1 = 'AGGTAB';
var string2 = 'GXTXAYB';
var m = string1.length;
var n = string2.length;
var A = new Array (m+1);
for (var i = 0; i < m+1; i++ ) {
	A[i] = new Array (n+1);
}

var tracer1 = new Array1DTracer ( '字符串1')._setData ( string1 );
var tracer2 = new Array1DTracer ( '字符串2')._setData ( string2 );
var tracer3 = new Array2DTracer ( '内存表')._setData ( A );
var logger = new LogTracer ('控制台');