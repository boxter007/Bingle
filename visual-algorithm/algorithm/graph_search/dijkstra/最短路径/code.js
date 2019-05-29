function Dijkstra(start, end) {
    tracer._wait(1);
    var minIndex, minDistance;
    tracer._wait(2);
    var D = []; // D[i] indicates whether the i-th node is discovered or not
    for (var i = 0; i < G.length; i++){
        tracer._wait(3);
        tracer._wait(4);
        D.push(false);  
    } 
    tracer._wait(6);
    S[start] = 0; // Starting node is at distance 0 from itself
    tracerS._notify(start, S[start])._wait()._denotify(start);
    tracerS._select(start)._wait(7);
    var k = G.length;
    while (k--) {
        tracer._wait(8);
        tracer._wait(9);
        // Finding a node with the shortest distance from S[minIndex]
        minDistance = MAX_VALUE;
        for (i = 0; i < G.length; i++) {
            tracer._wait(10);
            tracer._wait(11);
            if (S[i] < minDistance && !D[i]) {
                tracer._wait(12);
                minDistance = S[i];
                tracer._wait(13);
                minIndex = i;
            }
        }
        tracer._wait(16);
        if (minDistance === MAX_VALUE) {
            tracer._wait(17);
            break; // If there is no edge from current node, jump out of loop
        }
        tracer._wait(19);
        D[minIndex] = true;
        tracerS._select(minIndex);
        tracer._visit(minIndex)._wait();
        // For every unvisited neighbour of current node, we check
        // whether the path to it is shorter if going over the current node
        for (i = 0; i < G.length; i++) {
            tracer._wait(20);
            tracer._wait(21);
            if (G[minIndex][i] && S[i] > S[minIndex] + G[minIndex][i]) {
                S[i] = S[minIndex] + G[minIndex][i];
                tracer._wait(22);
                tracerS._notify(i, S[i]);
                tracer._visit(i, minIndex, S[i])._wait();
                tracerS._denotify(i);
                tracer._leave(i, minIndex)._wait();
            }
        }
        tracer._leave(minIndex)._wait();
    }
    if (S[end] === MAX_VALUE) {
        logger._print('不存在从 ' + start + ' 到 ' + end + ' 的路径');
    } else {
        logger._print('从 ' + start + ' 到 ' + end + ' 的最短路径为： ' + S[end]);
    }
}

logger._print('开始查找从 ' + ss + ' 到 ' + e + ' 路径的');
Dijkstra(ss, e);