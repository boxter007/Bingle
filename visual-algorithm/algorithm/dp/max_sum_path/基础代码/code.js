tracer._wait(0);
var N = DP.length;
tracer._wait(1);
var M = DP[0].length;
function update(i, j, value) {
    DP[i][j] = value;
    dataViewer._select(i, j)._wait();
    tracer._notify(i, j, DP[i][j])._wait();
    tracer._denotify(i, j);
    dataViewer._deselect(i, j);
}
for (var i = 0; i < N; i++) {
    tracer._wait(2);
    for (var j = 0; j < M; j++) {
        tracer._wait(3);
        tracer._wait(4);
        if (i === 0 && j === 0) {
            tracer._wait(5);
            update(i, j, D[i][j]);
        } else if (i === 0) {
            tracer._wait(6);
            tracer._select(i, j - 1);
            tracer._wait(7);
            update(i, j, DP[i][j - 1] + D[i][j]);
            tracer._deselect(i, j - 1);
        } else if (j === 0) {
            tracer._wait(8);
            tracer._select(i - 1, j);
            tracer._wait(9);
            update(i, j, DP[i - 1][j] + D[i][j]);
            tracer._deselect(i - 1, j);
        } else {
            tracer._select(i, j - 1)._select(i - 1, j);
            tracer._wait(11);
            update(i, j, Math.max(DP[i][j - 1], DP[i - 1][j]) + D[i][j]);
            tracer._deselect(i, j - 1)._deselect(i - 1, j);
        }
    }
}
logger._print('max = ' + DP[N - 1][M - 1]);
