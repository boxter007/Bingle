var jobId = ['a','b','c','d','e'];
var deadline = [2,1,2,1,3];
var profit = [100,19,27,25,15];
var N = deadline.length;

var tracer3 = new Array1DTracer('任务');
var tracer = new Array1DTracer('任务');
var tracer1 = new Array1DTracer('截止点');
var tracer2 = new Array1DTracer('收获');