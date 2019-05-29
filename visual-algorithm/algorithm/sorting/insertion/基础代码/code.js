logger._print('原始数组 = [' + D.join(', ') + ']');
for (var i = 1; i < D.length; i++) {
    logger._wait(0);
    logger._wait(1);
    var key = D[i];
    logger._print('插入 ' + key);
    tracer._select(i)._wait(2);
    var j;
    for (j = i - 1; (j >= 0) && (D[j] > key); j--) {
        logger._wait(3);
        D[j + 1] = D[j];
        tracer._notify(j + 1, D[j + 1])._wait(4);
        tracer._denotify(j + 1);
    }
    D[j + 1] = key;
    tracer._notify(j + 1, D[j + 1])._wait(6);
    tracer._denotify(j + 1);
    tracer._deselect(i);
}