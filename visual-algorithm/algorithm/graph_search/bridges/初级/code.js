//Depth First Search Exploration Algorithm to test connectedness of the Graph (see Graph Algorithms/DFS/exploration), without the tracer & logger commands
function DFSExplore (graph, source) {
	logger._wait(1);
	var stack = [ [source, null] ], visited = {};
	logger._wait(2);
	var node, prev, i, temp;

	while (stack.length > 0) {
		logger._wait(3);
		logger._wait(4);
		temp = stack.pop ();
		logger._wait(5);
		node = temp [0];
		logger._wait(6);
		prev = temp [1];
		logger._wait(7);
		if (!visited [node]) {
			logger._wait(8);
			visited [node] = true;
			//logger._print (node);

			/*
			if (prev !== undefined && graph [node] [prev]) { tracer._visit (node, prev)._wait (); console.log ('tracer ' + prev + ', ' + node); }
			else { tracer._visit (node)._wait (); console.log ('tracer ' + node); }
			*/

			for (i = 0; i < graph.length; i++) {
				logger._wait(9);
				logger._wait(10);
				if (graph [node] [i]) {
					logger._wait(11);
					stack.push ([i, node]);
				}
			}
		}
	}
	logger._wait(16);
	return visited;
}

function findBridges (graph) {
	logger._wait(19);
	var tempGraph, bridges = [], visited;

	for (var i = 0; i < graph.length; i++) {
		logger._wait(20);
		for (var j = 0; j < graph.length; j++) {
			logger._wait(21);
			logger._wait(22);
			if (graph [i] [j]) {	//check if an edge exists
				logger._print ('删除从 ' + i + '->' + j + ' 的边，调用 DFSExplore ()');
				tracer._visit (j, i)._wait ();
				tracer._leave (j, i)._wait ();
				logger._wait(23);
				tempGraph = JSON.parse (JSON.stringify (graph));
				logger._wait(24);
				tempGraph [i] [j] = 0;
				logger._wait(25);
				tempGraph [j] [i] = 0;
				logger._wait(26);
				visited = DFSExplore (tempGraph, 0);

				if (Object.keys (visited).length === graph.length) {
					logger._print ('图形已连接。 边不是桥');
				}
				else {
					logger._print ('图形未连接。边是桥');
					bridges.push ([i,j]);
				}
			}
		}
	}
	logger._wait(30);
	return bridges;
}
logger._wait(32);
var bridges = findBridges (G);

logger._print ('所有的桥: ');
for (var i in bridges) {
	logger._print (bridges [i] [0] + ' to ' + bridges [i] [1]);
}