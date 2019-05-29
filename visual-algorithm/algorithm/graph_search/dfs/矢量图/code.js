function DFS(node, parent, weight) { // node = current node, parent = previous node
    tracer._wait(1);
    D[node] = true; // label current node as discovered
    tracer._visit(node, parent, weight);
    for (var i = 0; i < G[node].length; i++) {
        tracer._wait(2);
        tracer._wait(3);
        if (G[node][i]) { // if the edge from current node to the i-th node exists
            tracer._wait(4);
            if (!D[i]) { // if the i-th node is not labeled as discovered
                tracer._wait(5);
                DFS(i, node, weight + G[node][i]); // recursively call DFS
            }
        }
    }
    tracer._wait(9);
    D[node] = false; // label current node as undiscovered
    tracer._leave(node, parent, 0);
}
tracer._wait(11);
var D; // D[i] indicates whether the i-th node is discovered or not
for (var i = 0; i < G.length; i++) { // start from every node
    tracer._wait(12);
    logger._print('start from ' + i);
    tracer._wait(13);
    D = [];
    tracer._wait(14);
    for (var j = 0; j < G.length; j++) D.push(false);
    tracer._wait(15);
    DFS(i, undefined, 0);
    tracer._clear();
}