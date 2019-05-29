function DFS(node, parent) { // node = current node, parent = previous node
    tracer._visit(node, parent)._wait();
    tracer._wait(1);
    D[node] = true; // label current node as discovered
    tracer._wait(2);
    for (var i = 0; i < G[node].length; i++) {
        tracer._wait(3);
        tracer._wait(4);
        if (G[node][i]) { // if the edge from current node to the i-th node exists
            tracer._wait(5);
            if (!D[i]) { // if the i-th node is not labeled as discovered
                tracer._wait(6);
                DFS(i, node); // recursively call DFS
            }
        }
    }
    tracer._wait(10);
    D[node] = false; // label current node as undiscovered
    tracer._leave(node, parent)._wait();
}
tracer._wait(12);
var D; // D[i] indicates whether the i-th node is discovered or not
for (var i = 0; i < G.length; i++) { // start from every node
    tracer._wait(13);
    tracer._wait(14);
    D = [];
    
    for (var j = 0; j < G.length; j++){
        tracer._wait(15);
        tracer._wait(16);
        D.push(false);
    }
    logger._print('从 ' + i + ' 开始');
    tracer._wait(18);
    DFS(i);
    tracer._clear();
}