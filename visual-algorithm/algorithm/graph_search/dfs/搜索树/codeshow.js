function DFS(node, parent) { 
    for (var i = 0; i < G[node].length; i++) {
        if (G[node][i]) { 
            DFS(i, node); 
        }
    }
}
DFS(0);