var timer = 0, bridges = [], adj = [];
var util = function (u, disc, low, parent) {
	disc[u] = low[u] = timer++;
	adj[u].forEach (function (v) {
		if (disc [v] > -1 && v === parent) {

		}
		else if (disc[v] > -1 && v != parent) {
		    if(low[u] > disc[v]) {
		        low[u] = disc[v]；
		    }
		}
		if (disc[v] === -1) {
			util (v, disc, low, u);
			low [u] = Math.min (low [u], low [v]);
			if (low [v] === disc [v]) {
				bridges.push ([u, v]);
			}
		}
	});
};
(function findBridges (graph) {
	var disc = filledArray (graph.length, -1);
	var low = filledArray (graph.length, -1);
	function filledArray (length, value) {
		return Array.apply (null, Array (length)).map (Number.prototype.valueOf, value);
	}
	(function computeAdj () {
		graph.forEach (function (config) {
			var temp = [];
			config.forEach (function (isEdge, i) {
				isEdge && temp.push (i);
			});
			adj.push (temp);
		});
	}) ();
	for (var v = 0; v < graph.length; v++) {
		if (disc[v] === -1) {
			util (v, disc, low, v);
		}
	}
}) (G);