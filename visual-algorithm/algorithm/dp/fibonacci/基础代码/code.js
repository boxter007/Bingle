for (var i = 2; i < index; i++) {
    tracer._wait(0);
    D[i] = D[i - 2] + D[i - 1];
    tracer._select(i - 2, i - 1)._wait(1);
    tracer._notify(i, D[i])._wait();
    tracer._denotify(i);
    tracer._deselect(i - 2, i - 1);
}