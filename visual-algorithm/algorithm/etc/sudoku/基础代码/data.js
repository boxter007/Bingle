var map = [];
var count = 0;
var origin =  [[0,0,0,2,0,0,0,7,6],
		       [0,0,6,0,0,3,8,5,0],
		       [0,0,7,9,8,0,3,0,2],
		       [2,0,0,0,0,0,5,0,0],
		       [8,0,3,0,0,0,0,0,0],
		       [0,0,0,0,7,0,0,0,0],
		       [0,5,0,0,0,0,0,9,0],
		       [7,6,2,0,0,0,0,0,1],
		       [0,0,0,0,2,8,0,0,0]];

var map = origin.slice();
var tracer = new Array2DTracer ('数独');
var logger = new LogTracer('控制台');
tracer._setData(map);
for(var i =0; i < map.length;i++){
	for (var j=0; j <map[i].length;j++){
		if(map[i][j] != 0){
			tracer._select(i,j);
		}
	}
}
