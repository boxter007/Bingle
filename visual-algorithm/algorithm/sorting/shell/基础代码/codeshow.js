var N = D.length;
for (var gap = N; gap = parseInt(gap / 2);) {
    for (var i = gap; i < N; i++) {
        var k = D[i];
        for (var j = i; j >= gap && k < D[j - gap]; j -= gap) {
            D[j] = D[j - gap];
        }
        var old = D[j];
        D[j] = k；
    }
}