function DFS(node, parent, weight) { // node = current node, parent = previous node
    tracer._wait(1);
    if (minWeight < weight) {
        tracer._wait(2);
        return;
    }
    tracer._wait(4);
    if (node === e) {
        tracer._visit(node, parent, weight);
        visited.push(node+'.'+parent+'.'+weight);
        tracer._wait(5);
        if (minWeight > weight) {
            tracer._wait(6);
            minWeight = weight;
            result = visited.slice();
        }
        tracer._leave(node, parent, minWeight);
        visited.pop();
        tracer._wait(8);
        return;
    }
    tracer._wait(10);
    D[node] = true; // label current node as discovered
    visited.push(node+'.'+parent+'.'+weight);
    tracer._visit(node, parent, weight);
    
    for (var i = 0; i < G[node].length; i++) {
        tracer._wait(11);
        tracer._wait(12);
        if (G[node][i]) { // if the path from current node to the i-th node exists
            tracer._wait(13);
            if (!D[i]) { // if the i-th node is not labeled as discovered
                tracer._wait(14);
                DFS(i, node, weight + G[node][i]); // recursively call DFS
            }
        }
    }
    tracer._wait(18);
    D[node] = false; // label current node as undiscovered
    visited.pop();
    tracer._leave(node, parent, 0);
}
tracer._wait(20);
var s = Integer.random(0, G.length - 1); // s = start node
tracer._wait(21);
var e; // e = end node
do {
    tracer._wait(23);
    e = Integer.random(0, G.length - 1);
    tracer._wait(24);
} while (s === e);
tracer._wait(25);
var MAX_VALUE = Infinity;
tracer._wait(26);
var minWeight = MAX_VALUE;
logger._print('开始从 ' + s + ' 到 ' + e + '查找最短路径');
tracer._wait(27);
var D = []; // D[i] indicates whether the i-th node is discovered or not
var visited = [], result = [];
tracer._wait(28);
for (var i = 0; i < G.length; i++) D.push(false);
    tracer._wait(29);
DFS(s, undefined, 0);
if (minWeight === MAX_VALUE) {
    logger._print('从 ' + s + ' 到 ' + e + '没有路径');
} else {
    logger._print('从 ' + s + ' 到 ' + e + ' 的最短路径是 ' + minWeight);
}
for (var i = 0 ;i < result.length ; i++) {
    var item = result[i].split('.');
    if (item[1] == 'undefined')
        item[1] = undefined;
    tracer._visit(item[0],item[1],item[2]);
}


