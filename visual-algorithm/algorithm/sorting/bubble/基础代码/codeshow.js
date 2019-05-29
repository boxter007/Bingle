var N = D.length;
var swapped;
do {
    swapped = false;
    for (var i = 1; i < N; i++) {
        if (D[i - 1] > D[i]) {
            var temp = D[i - 1];
            D[i - 1] = D[i];
            D[i] = temp;
            swapped = true;
        }
    }
    N--;
} while (swapped);