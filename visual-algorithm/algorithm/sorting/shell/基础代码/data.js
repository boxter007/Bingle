var chart = new ChartTracer('图表');
var tracer = new Array1DTracer('数组').attach(chart);
var logger = new LogTracer('控制台');
var D = Array1D.random(15);
tracer._setData(D);
