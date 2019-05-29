function prim() {
    // Finds a tree so that there exists a path between
    // every two nodes while keeping the cost minimal
    tracer._wait(1);
    var minD, minI, minJ, sum = 0, D = [];
    for (var i = 0; i < G.length; i++) {
        tracer._wait(2);
        tracer._wait(3);
        D.push(0);
    }
    tracer._wait(5);
    D[0] = 1; // First node is visited
    for (var k = 0; k < G.length - 1; k++) { // Searching for k edges
        tracer._wait(6);
        tracer._wait(7);
        minD = Infinity;
        for (i = 0; i < G.length; i++){
            tracer._wait(8);
            tracer._wait(9);
            if (D[i]){ // First node in an edge must be visited
                for (var j = 0; j < G.length; j++){
                    tracer._wait(10);
                    tracer._wait(11);
                    if (!D[j] && G[i][j]) {
                        tracer._visit(i, j)._wait(12);
                        // Second node must not be visited and must be connected to first node
                        if (G[i][j] < minD) {
                            // Searching for cheapest edge which satisfies requirements
                            tracer._wait(13);
                            minD = G[i][j];
                            tracer._wait(14);
                            minI = i;
                            tracer._wait(15);
                            minJ = j;
                        }
                        tracer._leave(i, j)._wait();
                    }
                }
            }
        }
        tracer._visit(minI, minJ)._wait(21);
        D[minJ] = 1; // Visit second node and insert it into or tree
        tracer._wait(22);
        sum += G[minI][minJ];
    }
    logger._print("所有边的最小和为: " + sum);
}
prim();