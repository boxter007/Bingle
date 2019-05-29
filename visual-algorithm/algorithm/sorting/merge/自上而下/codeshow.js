function mergeSort(start, end) {
    if (Math.abs(end - start) <= 1) return [];
    var middle = Math.ceil((start + end) / 2);
    mergeSort(start, middle);
    mergeSort(middle, end);
    return mergeSort.merge(start, middle, end);
}
mergeSort.merge = function (start, middle, end) {
    var leftSize = middle - start;
    var rightSize = end - middle;
    var maxSize = Math.max(leftSize, rightSize);
    var size = end - start;
    var left = [];
    var right = [];
    var i;
    for (i = 0; i < maxSize; i++) {
        if (i < leftSize) {
            left.push(D[start + i]);
        }
        if (i < rightSize) {
            right.push(D[middle + i]);
        }
    }
    i = 0;
    while (i < size) {
        if (left[0] && right[0]) {
            if (left[0] > right[0]) {
                D[start + i] = right.shift();
            } else {
                D[start + i] = left.shift();
            }
        } else if (left[0]) {
            D[start + i] = left.shift();
        } else {
            D[start + i] = right.shift();
        }
        i++;
    }
    var tempArray = [];
    for (i = start; i < end; i++) tempArray.push(D[i]);
};
mergeSort(0, D.length);