logger._print('原始数组 = [' + D.join(', ') + ']');
for (var i = 0; i < D.length - 1; i++) {
    logger._wait(0);
    var minJ = i;
    tracer._select(i)._wait(1);
    for (var j = i + 1; j < D.length; j++) {
        logger._wait(2);
    	tracer._select(j)._wait(3);
        if (D[j] < D[minJ]) {
            minJ = j;
            tracer._notify(j)._wait(4);
            tracer._denotify(j);
        }
        tracer._deselect(j);
    }
    logger._wait(7);
    if (minJ != i) {
        logger._print('交换（ ' + D[i] + ' ， ' + D[minJ] + ' ）');
        logger._wait(8);
        var temp = D[i];
        logger._wait(9);
        D[i] = D[minJ];
        D[minJ] = temp;
        tracer._notify(i, D[i])._notify(minJ, D[minJ])._wait(10);
        tracer._denotify(i)._denotify(minJ);
    }
    tracer._deselect(i);
}