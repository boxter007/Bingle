function DLSCount (limit, node, parent) { 
    tracer._visit(node, parent)._wait(1);
    var child = 0;
    tracer._wait(2);
    if (limit>0) { 
        tracer._wait(3);
        for (var i = 0; i < G[node].length; i++) {
            tracer._wait(3);
            tracer._wait(4);
            if (G[node][i]) {
                tracer._wait(5); 
                child += 1 + DLSCount(limit-1, i, node); 
            }
        }
        tracer._wait(8);
        return child;
    }else{
        tracer._wait(10);
      return child;
    }
}
logger._print('后代的数量： ' + DLSCount(2,0));
