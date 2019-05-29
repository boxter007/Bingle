function DFS(node, parent) { // node = current node, parent = previous node
    tracer._visit(node, parent)._wait();

    for (var i = 0; i < G[node].length; i++) {
    	tracer._wait(1);
    	tracer._wait(2);
        if (G[node][i]) { // if current node has the i-th node as a child
        	tracer._wait(3);
            DFS(i, node); // recursively call DFS
        }
    }
}
tracer._wait(7);
DFS(0);