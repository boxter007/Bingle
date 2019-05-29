var tracer = new WeightedDirectedGraphTracer('有向加权图');
var logger = new LogTracer('控制台');
tracer.attach(logger);
var G = WeightedDirectedGraph.random(5, 1, 1, 9);
tracer._setData(G);
var S = new Array(G.length);
for (var i = 0; i < G.length; i++) {
	S[i] = new Array(G.length)
}