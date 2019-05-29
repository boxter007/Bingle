function BFS(s) { // s = start node
    var Q = [];
    tracer._wait(1);
    Q.push(s); // add start node to queue
    tracer._wait(2);
    tracer._visit(s)._wait();
    while (Q.length > 0) {
        tracer._wait(3);
        var node = Q.shift(); // dequeue
        tracer._wait(4);
        for (var i = 0; i < G[node].length; i++) {
            tracer._wait(5);
            tracer._wait(6);
            if (G[node][i]) { // if current node has the i-th node as a child
                tracer._wait(7);
                Q.push(i); // add child node to queue
                tracer._visit(i, node)._wait();
            }
        }
    }
}
tracer._wait(14);
BFS(0);