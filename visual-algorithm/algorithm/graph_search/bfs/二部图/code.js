function BFSCheckBipartiteness(s) {
    var Q = [];
    logger._wait(1);
    // Create a new matrix to set colors (0,1)
    var Colors = [];
    for (var _i = 0; _i < G.length; _i++){
        logger._wait(2);
        logger._wait(3);
        Colors[_i] = -1;  
    } 
    colorsTracer._setData(Colors);
    logger._wait(5);
    Colors[s] = 1;
    colorsTracer._notify(s, 1);
    logger._wait(6);
    Q.push(s); // add start node to queue

    while (Q.length > 0) {
        logger._wait(7);
        var node = Q.shift(); // dequeue
        logger._wait(8);
        tracer._visit(node)._wait();

        for (var i = 0; i < G[node].length; i++) {
            logger._wait(9);
            logger._wait(10);
        	if (G[node][i]) {
                logger._wait(11);
        		if (Colors[i] === -1) {
                    logger._wait(12);
        			Colors[i] = 1 - Colors[node];
        			colorsTracer._notify(i, 1 - Colors[node]);
                    logger._wait(13);
        			Q.push(i);
        			tracer._visit(i, node)._wait();

        		} else if (Colors[i] == Colors[node]) {
                    logger._wait(14);
        			logger._print('图不是双向的');
                    logger._wait(15);
        			return false;
        		}
        	}
        }
    }
    logger._wait(20);
    logger._print('图是双向的');
    return true;
}
logger._wait(21);
BFSCheckBipartiteness(0);