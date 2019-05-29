tracer._wait(0);
var N = D.length;
tracer._wait(1);
var swapped;
do {
    tracer._wait(2);
    swapped = false;
    tracer._wait(3);
    tracer._select(N - 1)._wait();
    for (var i = 1; i < N; i++) {
        tracer._wait(4);
        tracer._select(i);
        tracer._wait(5);
        if (D[i - 1] > D[i]) {
            logger._print('交换 ' + D[i - 1] + ' 和 ' + D[i]);
            tracer._wait(6);
            var temp = D[i - 1];
            tracer._wait(7);
            D[i - 1] = D[i];
            tracer._wait(8);
            D[i] = temp;
            tracer._wait(9);
            swapped = true;
            tracer._notify(i - 1, D[i - 1])._notify(i, D[i])._wait();
            tracer._denotify(i - 1)._denotify(i);
            tracer._wait(10);
        }
        tracer._deselect(i);
        tracer._wait(11);
    }
    tracer._deselect(N - 1);
    tracer._wait(12);
    N--;
    tracer._wait(13);
} while (swapped);