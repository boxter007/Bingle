logger._print('原始数组 = [' + D.join(', ') + ']');

function heapSort(array, size) {
    logger._wait(1);
    var i, j, temp;

    for (i = Math.ceil(size / 2) - 1; i >= 0; i--) {
        logger._wait(2);
        logger._wait(3);
        heapify(array, size, i);
    }

    for (j = size - 1; j >= 0; j--) {
        logger._wait(5);
        logger._wait(6);
        temp = array[0];
        logger._wait(7);
        array[0] = array[j];
        logger._wait(8);
        array[j] = temp;
        
        tracer._notify(0, array[0])._notify(j, array[j]);
        logger._print('交换（' + array[0] + ' 和 ' + array[j] + '）')._wait(9);
        tracer._denotify(0)._denotify(j);
        tracer._select(j)._wait();

        heapify(array, j, 0);

        tracer._deselect(j);
    }
}

function heapify(array, size, root) {
    logger._wait(13);
    var largest = root;
    logger._wait(14);
    var left = 2 * root + 1;
    logger._wait(15);
    var right = 2 * root + 2;
    logger._wait(16);
    var temp;
    logger._wait(17);
    if (left < size && array[left] > array[largest]) {
        logger._wait(18);
        largest = left;
    }
    logger._wait(20);
    if (right < size && array[right] > array[largest]) {
        logger._wait(21);
        largest = right;
    }
    logger._wait(23);
    if (largest != root) {
        logger._wait(24);
        temp = array[root];
        logger._wait(25);
        array[root] = array[largest];
        logger._wait(26);
        array[largest] = temp;

        tracer._notify(root, array[root])._notify(largest, array[largest]);
        logger._print('交换（' + array[root] + ' 和 ' + array[largest] + '）')._wait(27);
        tracer._denotify(root)._denotify(largest);

        heapify(array, size, largest);
    }
}
logger._wait(30);
heapSort(D, D.length);