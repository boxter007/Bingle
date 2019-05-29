var G = [
[0,0,1,1,0,0],
[1,0,0,0,0,0],
[0,1,0,0,0,0],
[0,0,0,1,0,0],
[0,0,0,0,0,1],
[0,0,0,0,1,0]
];

var graphTracer = new DirectedGraphTracer();
graphTracer._setData(G);

var discTracer = new Array1DTracer('Disc');
var lowTracer = new Array1DTracer('Low');
var stackMemberTracer = new Array1DTracer('stackMember');
var stTracer = new Array1DTracer('st');

var logger = new LogTracer();
var disc = new Array(G.length);
var low = new Array(G.length);
var stackMember = new Array(G.length);
var st = [];
var carry = { time: 0 };
function SCC()
{
	for (var i = 0; i < G.length; i++) {
    	disc[i] = -1;
    	low[i] = -1;
    	stackMember[i] = false;
    }

    discTracer._setData(disc);
    lowTracer._setData(low);
    stackMemberTracer._setData(stackMember);
    stTracer._setData(st);
}
SCC();