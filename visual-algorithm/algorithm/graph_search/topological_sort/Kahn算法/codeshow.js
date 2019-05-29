(function topologicalSort() {
    var inDegrees = Array.apply(null, Array(G.length)).map(Number.prototype.valueOf, 0);
    var Q = [], iter = 0, i;
    for (var currNode = 0; currNode < G.length; currNode++) {
        for (var currNodeNeighbor = 0; currNodeNeighbor < G.length; currNodeNeighbor++) {
            if (G [currNode] [currNodeNeighbor]) {
                inDegrees [currNodeNeighbor]++;
            }
        }
    }
    inDegrees.map(function (indegrees, node) {
        if (!indegrees) {
            Q.push(node);
        }
    });
    while (Q.length > 0) {
        currNode = Q.shift();
        for (i = 0; i < G.length; i++) {
            if (G [currNode] [i]) {
                inDegrees [i]--;
                if (!inDegrees [i]) {
                    Q.push(i);
                }
            }
        }
        iter++;
    }
})();