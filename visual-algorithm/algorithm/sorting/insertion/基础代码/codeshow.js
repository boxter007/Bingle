for (var i = 1; i < D.length; i++) {
    var key = D[i];
    var j;
    for (j = i - 1; (j >= 0) && (D[j] > key); j--) {
        D[j + 1] = D[j];
    }
    D[j + 1] = key;
}