function kruskal() {
    var vcount = G.length;
    var edges = [];
    for (var vi = 0; vi < vcount - 1; vi++) {
        for (var vj = vi + 1; vj < vcount; vj++) {
            edges.push({
                0: vi,
                1: vj,
                weight: G[vi][vj]
            });
        }
    }
    edges.sort(function (ei, ej) {
        return ei.weight - ej.weight
    });
    var t = [];
    for (var i = 0; i < vcount; i++) {
        t[i] = {};
        t[i][i] = true;
    }
    var wsum = 0;
    for (var n = 0; n < vcount - 1 && edges.length > 0;) {
        var e = edges.shift(); 
        if (t[e[0]] === t[e[1]]) {
            continue;
        }
        wsum += e.weight;
        var tmerged = {};
        for (i in t[e[0]]) {
            tmerged[i] = true;
        }
        for (i in t[e[1]]) {
            tmerged[i] = true;
        }
        for (i in tmerged) {
            t[i] = tmerged;
        }
        n += 1;
    }
}
kruskal();