function DFS(node, parent, weight) { 
    if (minWeight < weight) {
        return;
    }
    if (node === e) {
        if (minWeight > weight) {
            minWeight = weight;
        }
        return;
    }
    D[node] = true; 
    for (var i = 0; i < G[node].length; i++) {
        if (G[node][i]) { 
            if (!D[i]) { 
                DFS(i, node, weight + G[node][i]); 
            }
        }
    }
    D[node] = false; 
}
var s = Integer.random(0, G.length - 1); 
var e; 
do {
    e = Integer.random(0, G.length - 1);
} while (s === e);
var MAX_VALUE = Infinity;
var minWeight = MAX_VALUE;
var D = []; 
for (var i = 0; i < G.length; i++) D.push(false);
DFS(s, undefined, 0);