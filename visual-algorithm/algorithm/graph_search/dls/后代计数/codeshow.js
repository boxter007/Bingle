function DLSCount (limit, node, parent) { 
    var child = 0;
    if (limit>0) { 
        for (var i = 0; i < G[node].length; i++) {
            if (G[node][i]) { 
                child += 1 + DLSCount(limit-1, i, node); 
            }
        }
        return child;
    }else{
      return child;
    }
}