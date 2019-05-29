var tracer = new WeightedDirectedGraphTracer('有向加权图');
var logger = new LogTracer('控制台');
tracer.attach(logger);
var G = WeightedDirectedGraph.random(5, .5, -2, 5);
tracer._setData(G);