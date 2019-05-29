function DFS(node, parent, weight) { 
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
var D; 
for (var i = 0; i < G.length; i++) { 
    D = [];
    for (var j = 0; j < G.length; j++) D.push(false);
    DFS(i, undefined, 0);
}