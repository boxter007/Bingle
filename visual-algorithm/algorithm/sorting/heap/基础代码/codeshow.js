function heapSort(array, size) {
    var i, j, temp;
    for (i = Math.ceil(size / 2) - 1; i >= 0; i--) {
        heapify(array, size, i);
    }
    for (j = size - 1; j >= 0; j--) {
        temp = array[0];
        array[0] = array[j];
        array[j] = temp;
        heapify(array, j, 0);
    }
}
function heapify(array, size, root) {
   var largest = root;
    var left = 2 * root + 1;
    var right = 2 * root + 2;
    var temp;
    if (left < size && array[left] > array[largest]) {
        largest = left;
    }
    if (right < size && array[right] > array[largest]) {
        largest = right;
    }
    if (largest != root) {
        temp = array[root];
        array[root] = array[largest];
        array[largest] = temp;
        heapify(array, size, largest);
    }
}
heapSort(D, D.length);