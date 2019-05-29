var newColor = 'a';
var oldColor = '-';
function FloodFill(i, j) {
    if (i < 0 || i >= G.length || j < 0 || j >= G[i].length) {
        return;
    }
    if (G[i][j] != oldColor) {
        return;
    }
    G[i][j] = newColor;
    FloodFill(i + 1, j, oldColor, newColor);
    FloodFill(i - 1, j, oldColor, newColor);
    FloodFill(i, j + 1, oldColor, newColor);
    FloodFill(i, j - 1, oldColor, newColor);
}
FloodFill(4, 4);

