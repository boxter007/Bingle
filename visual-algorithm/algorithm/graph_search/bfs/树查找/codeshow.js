function BFS(s) { 
    var Q = [];
    Q.push(s); 
    while (Q.length > 0) {
        var node = Q.shift(); 
        for (var i = 0; i < G[node].length; i++) {
            if (G[node][i]) { 
                Q.push(i); 
            }
        }
    }
}
BFS(0);