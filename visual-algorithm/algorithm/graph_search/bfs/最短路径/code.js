function BFS() {
    tracer._wait(1);
    var W = []; // W[i] indicates the length of the shortest path from start node to the i-th node
    var Q = [];
    var i;

    for (i = 0; i < G.length; i++) {
        tracer._wait(2);
        tracer._wait(3);
        W.push(MAX_VALUE);
        tracer._weight(i, MAX_VALUE);
    }
    tracer._wait(5);
    W[s] = 0;
    tracer._wait(6);
    Q.push(s); // add start node to queue
    tracer._visit(s, undefined, 0)._wait();
    while (Q.length > 0) {
        tracer._wait(7);
        tracer._wait(8);
        var node = Q.shift(); // dequeue
        for (i = 0; i < G[node].length; i++) {
            tracer._wait(9);
            tracer._wait(10);
            if (G[node][i]) { // if the edge from current node to the i-th node exists
                tracer._wait(11);
                if (W[i] > W[node] + G[node][i]) { // if current path is shorter than the previously shortest path
                    tracer._wait(12);
                    W[i] = W[node] + G[node][i]; // update the length of the shortest path
                    tracer._wait(13);
                    Q.push(i); // add child node to queue
                    tracer._visit(i, node, W[i])._wait();
                }
            }
        }
    }
    tracer._wait(18);
    return W[e];
}
tracer._wait(20);

var s = Integer.random(0, G.length - 1); // s = start node
var e; // e = start node
tracer._wait(21);
do {
    e = Integer.random(0, G.length - 1);
    tracer._wait(22);
} while (s === e);
tracer._wait(24);
var MAX_VALUE = Infinity;
tracer._wait(25);
logger._print('从  ' + s + ' 到 ' + e + ' 寻找最短路径');
var minWeight = BFS(s);
if (minWeight === MAX_VALUE) {
    logger._print('不存在从 ' + s + ' 到 ' + e +' 的路径');
} else {
    logger._print('从 ' + s + ' 到 ' + e + ' 的最短路径是： ' + minWeight);
}