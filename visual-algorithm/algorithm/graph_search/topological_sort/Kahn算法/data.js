var tracer = new DirectedGraphTracer('有向图');
var logger = new LogTracer('控制台');
tracer.attach(logger);
var G = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0, 0]
];
tracer._setData(G);