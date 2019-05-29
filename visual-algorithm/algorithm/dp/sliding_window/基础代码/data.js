var tracer = new Array1DTracer('数据');
var logger = new LogTracer('控制台');
tracer.attach(logger);
var D = Array1D.random(20, -5, 5);
tracer._setData(D);