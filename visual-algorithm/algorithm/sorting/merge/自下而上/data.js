var chart = new ChartTracer('图表');
var tracer = new Array2DTracer('数组');
var logger = new LogTracer('控制台');
var F = Array1D.random(20, 0, 50);
var D = [
    F,
    Array1D.random(20, 0, 0)
];
tracer._setData(D);
chart._setData(F);