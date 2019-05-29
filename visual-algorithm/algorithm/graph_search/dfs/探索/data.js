var graphTracer = new UndirectedGraphTracer('无向图');
var visitedTracer = new Array1DTracer('已访问');
var logger = new LogTracer('控制台');
var visited = [];
graphTracer.attach(logger);
var G = UndirectedGraph.random(8, .3);
graphTracer._setData(G);
 for (i = 0; i < G.length; i++) {
    visited.push(false);
 }
 visitedTracer._setData(visited);