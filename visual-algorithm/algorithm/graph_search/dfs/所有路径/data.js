var tracer = new UndirectedGraphTracer('无向图');
var logger = new LogTracer('控制台');
tracer.attach(logger);
var G = UndirectedGraph.random(5, 1);
tracer._setData(G);