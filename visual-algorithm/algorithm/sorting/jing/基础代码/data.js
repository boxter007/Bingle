var tracer = new Array1DTracer('原始数组');
var ltracer = new Array1DTracer('左数组');
var ctracer = new Array1DTracer('中数组');
var rtracer = new Array1DTracer('右数组');
var ftracer = new Array1DTracer('排序数组');
var logger = new LogTracer('控制台');
var D = Array1D.random(15);
tracer._setData(D);
ftracer._setData([]);