function Dijkstra(start, end) {
    var minIndex, minDistance;
    var D = []; 
    for (var i = 0; i < G.length; i++) {
        D.push(false);
    }
    S[start] = 0; 
    var k = G.length;
    while (k--) {
        minDistance = MAX_VALUE;
        for (i = 0; i < G.length; i++) {
            if (S[i] < minDistance && !D[i]) {
                minDistance = S[i];
                minIndex = i;
            }
        }
        if (minDistance === MAX_VALUE) {
            break; 
        }
        D[minIndex] = true;
        for (i = 0; i < G.length; i++) {
            if (G[minIndex][i] && S[i] > S[minIndex] + G[minIndex][i]) {
                S[i] = S[minIndex] + G[minIndex][i];
            }
        }
    }
}
Dijkstra(ss, e);