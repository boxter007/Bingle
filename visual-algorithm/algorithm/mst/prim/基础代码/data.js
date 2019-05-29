var tracer = new WeightedUndirectedGraphTracer('无向加权图');
var logger = new LogTracer('控制台');
tracer.attach(logger);
var G = WeightedUndirectedGraph.random(10, .4, 1, 9);
tracer._setData(G);