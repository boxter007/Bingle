function DLS (limit, node, parent) { 
    if (limit>0) { 
        for (var i = 0; i < G[node].length; i++) {
            if (G[node][i]) { 
                DLS(limit-1, i, node); 
            }
        }
    }
}
DLS(2,0);