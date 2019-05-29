var tracer = new Array1DTracer("字符串");
var logger = new LogTracer("控制台");
var A = Array1D.random(10, 0, 10);
var LIS = new Array(A.length);
tracer._setData(A);