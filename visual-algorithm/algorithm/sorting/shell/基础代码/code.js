logger._print('原始数组 = [' + D.join(', ') + ']');
logger._wait(0);
var N = D.length;

for (var gap = N; gap = parseInt(gap / 2);) {
    logger._wait(1);
    logger._print('');
    logger._print('增量 ' + gap);
    for (var i = gap; i < N; i++) {
        tracer._select(i)._select(i - gap)._wait(2);
        logger._wait(3);
        var k = D[i];
        logger._print('哨: ' + k)
        for (var j = i; j >= gap && k < D[j - gap]; j -= gap) {
            logger._wait(4);
            logger._print(k + ' < ' + D[j - gap]);
            D[j] = D[j - gap];
            tracer._notify(j, D[j])._wait(5);
            tracer._denotify(j);
        }
        logger._wait(7);
        var old = D[j];
        logger._wait(8);
        D[j] = k;
        if (old != k) {
            tracer._notify(j,D[j])._wait();
            tracer._denotify(j);
            logger._print('交换（' + D[j] + ' ， ' + old +'）');
        }
        tracer._deselect(i)._deselect(i - gap);
    }
}