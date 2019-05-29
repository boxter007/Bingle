var D = Array2D.random(5, 5, 1, 5);
var dataViewer = new Array2DTracer('过程表')._setData(D);
var tracer = new Array2DTracer('结果表');
var logger = new LogTracer('控制台');
var DP = [];
for (var i = 0; i < D.length; i++) {
    DP.push([]);
    for (var j = 0; j < D[i].length; j++) {
        DP[i].push(Infinity);
    }
}
tracer._setData(DP);
