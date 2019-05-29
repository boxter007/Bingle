function DFSExplore(graph, source) {
  var stack = [[source, null]], visited = [];
  var node, prev, i, temp;
  while (stack.length > 0) {
    temp = stack.pop();
    node = temp [0];
    prev = temp [1];
    if (!visited[node]) {
      visited[node] = true;
      for (i = 0; i < graph.length; i++) {
        if (graph[node][i]) {
          stack.push([i, node]);
        }
      }
    }
  }
  return visited;
}
var visited = DFSExplore(G, 0);
var check = true;
for (var i = 0; i < visited.length; i++) {
  check &= visited[i];
}