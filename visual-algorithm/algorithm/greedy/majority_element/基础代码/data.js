var A = [ 1, 3, 3, 2, 1, 1, 1 ];
var N = A.length;

var tracer = new Array1DTracer('列表')._setData (A);
var logger = new LogTracer ('控制台');