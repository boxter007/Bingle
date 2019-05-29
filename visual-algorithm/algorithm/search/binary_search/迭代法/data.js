var chart = new ChartTracer('图例');
var tracer = new Array1DTracer('数字').attach(chart);
var logger = new LogTracer('控制台');
var D = Array1D.randomSorted(15, 0, 50);
tracer._setData(D);