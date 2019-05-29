function DFSExplore(graph, source) {
  visitedTracer._wait(1);
  var stack = [[source, null]];
  visitedTracer._wait(2);
  var node, prev, i, temp;

  while (stack.length > 0) {
    visitedTracer._wait(3);
    visitedTracer._wait(4);
    temp = stack.pop();
    visitedTracer._wait(5);
    node = temp [0];
    visitedTracer._wait(6);
    prev = temp [1];
    visitedTracer._wait(7);
    if (!visited[node]) {
      visitedTracer._wait(8);
      visited[node] = true;
      visitedTracer._notify(node, visited[node]);
      if (prev !== undefined && graph[node][prev]) {
        graphTracer._visit(node, prev)._wait();
      } else {
        graphTracer._visit(node)._wait();
      }

      for (i = 0; i < graph.length; i++) {
        visitedTracer._wait(9);
        visitedTracer._wait(10);
        if (graph[node][i]) {
          visitedTracer._wait(11);
          stack.push([i, node]);
        }
      }
    }
  }
  visitedTracer._wait(16);
  return visited;
}
visitedTracer._wait(18);
var visited = DFSExplore(G, 0);
visitedTracer._wait(19);
var check = true;
visitedTracer._wait(20);
for (var i = 0; i < visited.length; i++) check &= visited[i];
if (check) {
  logger._print('图是链接的');
} else {
  logger._print('图没有链接');
}
