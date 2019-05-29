function kruskal() {
    tracer._wait(1);
    var vcount = G.length;

    // Preprocess: sort edges by weight.
    tracer._wait(2);
    var edges = [];
    for (var vi = 0; vi < vcount - 1; vi++) {
        tracer._wait(3);
        for (var vj = vi + 1; vj < vcount; vj++) {
            tracer._wait(4);
            tracer._wait(5);
            edges.push({
                0: vi,
                1: vj,
                weight: G[vi][vj]
            });
        }
    }
    tracer._wait(12);
    edges.sort(function (ei, ej) {
        return ei.weight - ej.weight
    });

    // Give each vertex a tree to decide if they are already in the same tree.
    tracer._wait(15);
    var t = [];
    for (var i = 0; i < vcount; i++) {
        tracer._wait(16);
        tracer._wait(17);
        t[i] = {};
        tracer._wait(18);
        t[i][i] = true;
    }
    tracer._wait(20);
    var wsum = 0;
    for (var n = 0; n < vcount - 1 && edges.length > 0;) {
        tracer._wait(21);
        tracer._wait(22);
        var e = edges.shift(); // Get the edge of min weight
        tracer._visit(e[0], e[1]);
        tracer._wait(23);
        if (t[e[0]] === t[e[1]]) {
            // e[0] & e[1] already in the same tree, ignore
            tracer._leave(e[0], e[1])._wait(24);
            continue;
        }

        // Choose the current edge.
        tracer._wait(26);
        wsum += e.weight;

        // Merge tree of e[0] & e[1]
        tracer._wait(27);
        var tmerged = {};
        for (i in t[e[0]]){
            tracer._wait(28);
            tracer._wait(29);
            tmerged[i] = true;
        }
        for (i in t[e[1]]){
            tracer._wait(31);
            tracer._wait(32);
            tmerged[i] = true;
        } 
        for (i in tmerged){
            tracer._wait(34);
            tracer._wait(35);
            t[i] = tmerged;
        } 
        tracer._wait(37);
        n += 1;
    }

    logger._print("所有边的和最小为: " + wsum);
}
tracer._wait(40);
kruskal();
