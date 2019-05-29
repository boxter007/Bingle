/*
	NOTE: Code assumes NO parallel edges
*/

var timer = 0, bridges = [], adj = [];	//adj keeps track of the neighbors of each node
logger._wait(0);
var util = function (u, disc, low, parent) {
	//u is the node that is currently being processed in the DFS (depth-first search)
	//disc is the numbering of the vertices in the DFS, starting at 0
	//low[v] is the lowest numbered vertex that can be reached from vertex v along the DFS
	//parent is the node that u came from
	logger._wait(2);
	logger._print ('');
	logger._print ('遍历节点： ' + u);
	graphTracer._visit (u)._wait ();
	graphTracer._leave (u)._wait ();

	//visited [u] = true;
	disc [u] = low [u] = timer++;

	logger._print ('与节点 ' + u + ' 相邻的是: [ ' + adj [u] + ' ]');
	/*adj [u].forEach (function (v) {
		graphTracer._visit (v, u)._wait ();
		graphTracer._leave (v, u)._wait ();
	});*/
	var trace = function(v) {
		graphTracer._visit (v, u)._wait ();
		graphTracer._leave (v, u)._wait ();
	}

	adj [u].forEach (function (v) {
		logger._wait(3);
		logger._wait(4);
		if (disc [v] > -1 && v === parent) {
			trace(v);
			logger._print ('节点 ' + u + ' 相邻的节点 ' + v + ' 是父节点，不访问它。');
		}
		else if (disc[v] > -1 && v != parent) {
			logger._wait(7);
			trace(v);
		    logger._print('节点 ' + u + ' 相邻的节点 ' + v + ' 不是父节点。 比较 low[u] 和 disc[v]')
		    logger._wait(8);
		    if(low[u] > disc[v]) {
		        logger._print('low[' + u + '] 大于 disc[' + v + ']. 将 low[' + u + '] 赋值成 disc[' + v + ']')
		        low[u] = disc[v]
		        logger._wait(9);
		    }
		}
		logger._wait(12);
		if (disc[v] === -1) {
			trace(v);
			logger._print (u + ' 相邻的节点 ' + v + ' 已经遍历过了。');

			logger._print ('递归调用 util (' + v + ', [' + disc + '], [' + low + '],' + u + ')');
			logger._wait(13);
			util (v, disc, low, u);

			logger._print ('----------------------------------');

			logger._print ('将 low [' + u + '] 赋值为 ' + Math.min (low [u], low [v]));
			logger._wait(14);
			low [u] = Math.min (low [u], low [v]);
			logger._wait(15);
			if (low [v] === disc [v]) {
				logger._print ('low [' + v + '] == disc [' + v + '], low[' + v + ']=' + low[v] + ', disc[' + v + ']=' + disc[v]);
				logger._print (u + ' -> ' + v + ' 是一个桥.');
				logger._wait(16);
				bridges.push ([u, v]);
			}
		}

	});
};

(function findBridges (graph) {
	logger._wait(22);
	var disc = filledArray (graph.length, -1);
	logger._wait(23);
	var low = filledArray (graph.length, -1);

	function filledArray (length, value) {
		return Array.apply (null, Array (length)).map (Number.prototype.valueOf, value);
	}

	//PRECOMPUTATION: store every node's neighbor info in auxiliary array for efficient retrieval later
	(function computeAdj () {
		logger._wait(28);
		graph.forEach (function (config) {
			logger._wait(29);
			var temp = [];
			logger._wait(30);
			config.forEach (function (isEdge, i) {
				logger._wait(31);
				isEdge && temp.push (i);
			});
			logger._wait(33);
			adj.push (temp);
		});
	}) ();

	logger._print ('初始化: <b>disc</b>: ' + disc + ' <b>low</b>: ' + low);
	logger._print ('');
	logger._print ('开始高级桥检索');
	
	for (var v = 0; v < graph.length; v++) {
		logger._wait(36);
		logger._wait(37);
		if (disc[v] === -1) {
			logger._print (v + ' 已经遍历过. 调用 util (' + v + ',  [' + disc + '], [' + low + '],' + v + ') ');
			logger._wait(38);
			util (v, disc, low, v);
		}
	}
}) (G);

logger._print ('存在 ' + bridges.length + ' 个桥');
for (var i = 0; i < bridges.length; i++) {
	logger._print (bridges [i] [0] + '-->' + bridges [i] [1]);
}