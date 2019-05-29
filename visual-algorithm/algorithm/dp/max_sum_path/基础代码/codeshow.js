var N = DP.length;
var M = DP[0].length;
for (var i = 0; i < N; i++) {
    for (var j = 0; j < M; j++) {
        if (i === 0 && j === 0) {
            DP[i][j] = D[i][j];
        } else if (i === 0) {
            DP[i][j] =  DP[i][j - 1] + D[i][j];
        } else if (j === 0) {
            DP[i][j] = DP[i - 1][j] + D[i][j];
        } else {
            DP[i][j] = Math.max(DP[i][j - 1], DP[i - 1][j]) + D[i][j];
        }
    }
}