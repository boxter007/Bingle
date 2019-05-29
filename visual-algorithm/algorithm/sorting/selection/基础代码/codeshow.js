for (var i = 0; i < D.length - 1; i++) {
    var minJ = i;
    for (var j = i + 1; j < D.length; j++) {
        if (D[j] < D[minJ]) {
            minJ = j;
        }
    }
    if (minJ != i) {
        var temp = D[i];
        D[i] = D[minJ];
        D[minJ] = temp;
    }
}