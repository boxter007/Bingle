function DFSExplore (graph, source) {
	var stack = [ [source, null] ], visited = {};
	var node, prev, i, temp;
	while (stack.length > 0) {
		temp = stack.pop ();
		node = temp [0];
		prev = temp [1];
		if (!visited [node]) {
			visited [node] = true;
			for (i = 0; i < graph.length; i++) {
				if (graph [node] [i]) {
					stack.push ([i, node]);
				}
			}
		}
	}
	return visited;
}
function findBridges (graph) {
	var tempGraph, bridges = [], visited;
	for (var i = 0; i < graph.length; i++) {
		for (var j = 0; j < graph.length; j++) {
			if (graph [i] [j]) {	
				tempGraph = JSON.parse (JSON.stringify (graph));
				tempGraph [i] [j] = 0;
				tempGraph [j] [i] = 0;
				visited = DFSExplore (tempGraph, 0);
			}
		}
	}
	return bridges;
}
var bridges = findBridges (G);