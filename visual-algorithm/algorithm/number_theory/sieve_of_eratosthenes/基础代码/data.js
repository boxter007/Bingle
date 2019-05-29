var tracer = new Array1DTracer('数字区间');
var N = 30;
var a = [];
var b = [];
for (var i = 1; i <= N; i++) {
  a.push(i);
  b.push(0);
}
tracer._setData(a);
var logger = new LogTracer('控制台');
