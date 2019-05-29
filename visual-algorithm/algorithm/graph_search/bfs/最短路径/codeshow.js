function BFS() {
    var W = [], Q = [], i;
    for (i = 0; i < G.length; i++) {
        W.push(MAX_VALUE);
    }
    W[s] = 0;
    Q.push(s); 
    while (Q.length > 0) {
        var node = Q.shift(); 
        for (i = 0; i < G[node].length; i++) {
            if (G[node][i]) { 
                if (W[i] > W[node] + G[node][i]) { 
                    W[i] = W[node] + G[node][i]; 
                    Q.push(i); 
                }
            }
        }
    }
    return W[e];
}
var s = Integer.random(0, G.length - 1), e;
do {
    e = Integer.random(0, G.length - 1);
} while (s === e);
var MAX_VALUE = Infinity;
var minWeight = BFS(s);