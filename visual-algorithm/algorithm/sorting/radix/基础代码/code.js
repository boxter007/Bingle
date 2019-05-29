logger._print('原始数组 = [' + D[0].join(', ') + ']');
function pow(base, expo) {
    logger._wait(1);
    var ans = 1;
    for (var i = 0; i < expo; i++) {
        logger._wait(2);
        logger._wait(3);
        ans *= base;
    }
    logger._wait(5);
    return ans;
}
function digit(i, exp) {
    logger._wait(8);
    return parseInt(D[0][i] / pow(10, exp) % 10);
}
for (var exp = 0; exp < 3; exp++) {
    logger._wait(10);
    logger._print("第 " + exp + " 次循环");
    logger._wait(11);
    var i;
    for (i = 0; i < D[0].length; i++) {
        logger._wait(12);
        var d = digit(i, exp);
        tracer._select(0, i)._wait(13);
        D[2][d] += 1;
        tracer._notify(2, d, D[2][d])._wait(14);
        tracer._denotify(2, d);
        tracer._deselect(0, i);
    }
    for (i = 1; i < 10; i++) {
        tracer._select(2, i - 1)._wait(16);
        D[2][i] += D[2][i - 1];
        tracer._notify(2, i, D[2][i])._wait(17);
        tracer._denotify(2, i);
        tracer._deselect(2, i - 1);
    }
    for (i = D[0].length - 1; i >= 0; i--) {
        logger._wait(19);
        var d = digit(i, exp);
        tracer._select(0, i)._wait(20);
        D[2][d] -= 1;
        tracer._notify(2, d, D[2][d])._wait(21);
        tracer._denotify(2, d);
        D[1][D[2][d]] = D[0][i];
        tracer._notify(1, D[2][d], D[1][D[2][d]])._wait(22);
        tracer._denotify(1, D[2][d]);
        tracer._deselect(0, i);
    }
    for (i = 0; i < D[0].length; i++) {
        tracer._select(1, i)._wait(24);
        D[0][i] = D[1][i];
        tracer._notify(0, i, D[0][i])._wait(25);
        tracer._denotify(0, i);
        tracer._deselect(1, i);
    }
    for (i = 0; i < 10; i++) {
        logger._wait(27);
        D[2][i] = 0;
        tracer._notify(2, i, D[2][i])._wait(28);
        tracer._denotify(2, i);
    }
}
logger._print('排序后数组 = [' + D[0].join(', ') + ']');