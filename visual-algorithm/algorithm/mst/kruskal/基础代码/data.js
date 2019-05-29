var tracer = new WeightedUndirectedGraphTracer('无向加权图');
var logger = new LogTracer('控制台');
var G = WeightedUndirectedGraph.random(5, 1, 1, 9);
tracer._setData(G);