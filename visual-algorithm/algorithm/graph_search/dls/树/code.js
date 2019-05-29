function DLS (limit, node, parent) { 
    tracer._visit(node, parent)._wait(1);
    if (limit>0) { 
    	tracer._wait(2);
        for (var i = 0; i < G[node].length; i++) {
        	tracer._wait(3);
        	tracer._wait(4);
            if (G[node][i]) {
            	tracer._wait(5); 
                DLS(limit-1, i, node); 
            }
        }
    }
}
tracer._wait(9);
DLS(2,0);
