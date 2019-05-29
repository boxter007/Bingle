function prim() {
    var minD, minI, minJ, sum = 0, D = [];
    for (var i = 0; i < G.length; i++) {
        D.push(0);
    }
    D[0] = 1; 
    for (var k = 0; k < G.length - 1; k++) { 
        minD = Infinity;
        for (i = 0; i < G.length; i++){
            if (D[i]){
                for (var j = 0; j < G.length; j++){
                    if (!D[j] && G[i][j]) {
                        if (G[i][j] < minD) {
                            minD = G[i][j];
                            minI = i;
                            minJ = j;
                        }
                    }
                }
            }
        }
        D[minJ] = 1; 
        sum += G[minI][minJ];
    }
}
prim();