tracer._wait(0);
var newColor = 'a';
tracer._wait(1);
var oldColor = '-';
function FloodFill(i, j) {
    tracer._wait(3);
    if (i < 0 || i >= G.length || j < 0 || j >= G[i].length) {
        tracer._wait(4);
        return;
    }
    tracer._wait(6);
    if (G[i][j] != oldColor) {
        tracer._wait(7);
        return;
    }
    tracer._wait(9);
    G[i][j] = newColor;

    tracer._select(i, j)._wait();
    tracer._notify(i, j, G[i][j])._wait();
    tracer._wait(10);
    FloodFill(i + 1, j, oldColor, newColor);
    tracer._wait(11);
    FloodFill(i - 1, j, oldColor, newColor);
    tracer._wait(12);
    FloodFill(i, j + 1, oldColor, newColor);
    tracer._wait(13);
    FloodFill(i, j - 1, oldColor, newColor);
}
tracer._wait(15);
FloodFill(4, 4);
