var tracer = new WeightedUndirectedGraphTracer('无向加权图');
var tracerS = new Array1DTracer('节点权重');
var logger = new LogTracer('控制台');
tracer.attach(logger);
var G = WeightedUndirectedGraph.random(5, 1, 1, 9);
tracer._setData(G);
var MAX_VALUE = Infinity;
var S = []; 
for (var i = 0; i < G.length; i++) S[i] = MAX_VALUE;
tracerS._setData(S);
var ss = Integer.random(0, G.length - 1); 
var e; 
do {
    e = Integer.random(0, G.length - 1);
} while (ss === e);