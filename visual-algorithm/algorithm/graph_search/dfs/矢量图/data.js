var tracer = new WeightedUndirectedGraphTracer('无向加权图');
var logger = new LogTracer('控制台');
tracer.attach(logger);
var G = WeightedUndirectedGraph.random(5, 1);
tracer._setData(G);