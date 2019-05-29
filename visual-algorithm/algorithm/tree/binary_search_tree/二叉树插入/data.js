var T = {};
var elements = [5,8,10,3,1,6,9,7,2,0,4]; 
var tracer = new DirectedGraphConstructTracer( "二叉树", 0);
var tracer2 = new Array1DTracer ( "数组")._setData ( elements );
var logger = new LogTracer ( "控制台");
tracer.attach ( logger );