function mergeSort(start, end) {
    if (Math.abs(end - start) <= 1) return;
    var mergeFrom = 0, mergeTo = 1, width, i;
    for (width = 1; width < end; width = width * 2) {
        for (i = 0; i < end; i = i + 2 * width) {
            merge(mergeFrom, i, Math.min(i + width, end), Math.min(i + 2 * width, end), mergeTo);
        }
        mergeFrom = (mergeFrom === 0 ? 1 : 0);
        mergeTo = 1 - mergeFrom;
    }
    if (mergeFrom !== 0) {
        copy(mergeFrom, mergeTo, start, end);
    }
}
function merge(mergeFrom, start, middle, end, mergeTo) {
    var i = start, j = middle, k;
    for (k = start; k < end; k++) {
        if (i < middle && (j >= end || D[mergeFrom][i] <= D[mergeFrom][j])) {
            D[mergeTo][k] = D[mergeFrom][i];
            i = i + 1;
        } else {
            D[mergeTo][k] = D[mergeFrom][j];
            j = j + 1;
        }
    }
}
function copy(mergeFrom, mergeTo, start, end) {
    var i;
    for (i = start; i < end; i++) {
        D[mergeTo][i] = D[mergeFrom][i];
   }
}
mergeSort(0, D[0].length);