function BFSCheckBipartiteness(s) {
    var Q = [] , Colors = [];
    for (var _i = 0; _i < G.length; _i++){
        Colors[_i] = -1;
    }
    Colors[s] = 1;
    Q.push(s); 
    while (Q.length > 0) {
        var node = Q.shift(); 
        for (var i = 0; i < G[node].length; i++) {
        	if (G[node][i]) {
        		if (Colors[i] === -1) {
        			Colors[i] = 1 - Colors[node];
        			Q.push(i);
        		} else if (Colors[i] == Colors[node]) {
        			return false;
        		}
        	}
        }
    }
    return true;
}
BFSCheckBipartiteness(0);