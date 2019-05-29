logger._print('原始数组 = [' + D.join(', ') + ']');

function partition(D, low, high) {
    logger._print('排列分区：[' + low + ',' + high + ']');
    logger._wait(1);
    var i, j, s;
    while (high > low) {
        logger._wait(2);
        logger._wait(3);
        i = low;
        logger._wait(4);
        j = high;
        logger._wait(5);
        s = D[low];
        while (i < j) {
            tracer._select(high)._select(low)._wait(6);
            while (D[j] > s){ 
                tracer._select(j)._wait(7);
                tracer._deselect(j);
                logger._wait(8);
                j--;
            }
            logger._wait(10);
            D[i] = D[j];
            tracer._notify(i, D[j])._wait()._denotify(i);
            while (s >= D[i] && i < j){ 
                tracer._select(i)._wait(11);
                tracer._deselect(i);
                logger._wait(12);
                i++;
            }
            D[j] = D[i];
            tracer._notify(j, D[i])._wait(14)._denotify(j);
            tracer._deselect(high)._deselect(low);
        }
        D[i] = s;
        tracer._notify(i, s)._wait(16);
        tracer._denotify(i);
        logger._wait(17);
        partition(D, low, i-1);
        logger._wait(18);
        low = i+1;
    }
}

function quicksort(D) {
    logger._wait(22);
    partition(D, 0, D.length-1);
}
logger._wait(24);
quicksort(D);