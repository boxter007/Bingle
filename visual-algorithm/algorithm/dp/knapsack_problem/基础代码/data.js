var val = [1,4,5,7]; // 所有物品的价值
var wt = [1,3,4,5];  // 所有物品的重量
var W = 7;           // 最大重量
var N = val.length;
var DP = new Array(N+1);

for (var i = 0; i < N + 1; i++) {
    DP[i] = new Array(W+1);
    for (var j = 0; j < W + 1; j++) {
        DP[i][j] = 0;
    }
}

var tracer = new Array2DTracer('背包表')._setData(DP);
var dataViewer1 = new Array1DTracer('价值')._setData(val);
var dataViewer2 = new Array1DTracer('重量')._setData(wt);
var logger = new LogTracer("控制台");
