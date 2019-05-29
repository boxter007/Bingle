(function topologicalSort() {
    logger._wait(1);
    var inDegrees = Array.apply(null, Array(G.length)).map(Number.prototype.valueOf, 0);		//create an Array of G.length number of 0s
    logger._wait(2);
    var Q = [], iter = 0, i;

    logger._print('计算每个节点的入度');
    for (var currNode = 0; currNode < G.length; currNode++) {
        logger._wait(3);
        for (var currNodeNeighbor = 0; currNodeNeighbor < G.length; currNodeNeighbor++) {
            logger._wait(4);
            logger._wait(5);
            if (G [currNode] [currNodeNeighbor]) {
                logger._print('节点 ' + currNodeNeighbor + ' 有来自节点 ' + currNode + ' 的指向 ');
                tracer._visit(currNodeNeighbor, currNode)._wait(6);
                inDegrees [currNodeNeighbor]++;
                tracer._leave(currNodeNeighbor, currNode)._wait();
            }
        }
    }
    logger._print('完成. 入度是: [ ' + String(inDegrees) + ' ]');
    logger._print('');

    logger._print('初始化队列');
    inDegrees.map(function (indegrees, node) {
        tracer._visit(node)._wait(11);
        if (!indegrees) {
            logger._print(node + ' 是一个源')._wait(12);
            Q.push(node);
        }
        tracer._leave(node)._wait();
    });
    logger._print('完成. 初始化队列: [ ' + String(Q) + ' ]');
    logger._print('');

    //begin topological sort (kahn)
    while (Q.length > 0) {
        logger._wait(15);
        logger._print('第 ' + iter + ' 次迭代 队列状态: [ ' + String(Q) + ' ]');
        currNode = Q.shift();
        tracer._visit(currNode)._wait(16);

        for (i = 0; i < G.length; i++) {
            logger._wait(17);
            logger._wait(18);
            if (G [currNode] [i]) {
                logger._print('节点 ' + i + ' 有来自节点 ' + currNode + ' 的指向. 节点 ' + i + ' 的入度减1');
                tracer._visit(i, currNode)._wait(19);
                inDegrees [i]--;
                tracer._leave(i, currNode)._wait(20);

                if (!inDegrees [i]) {
                    logger._print(i + '的入度是0，压入队列');
                    logger._wait(21);
                    Q.push(i);
                }
            }
        }
        tracer._leave(currNode);
        logger._print('入度是: [' + String(inDegrees) + ' ]');
        logger._print('-----------------------------------');
        logger._wait(25);
        iter++;
    }
})();