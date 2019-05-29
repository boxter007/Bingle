function SCCVertex(u, disc, low,  st, stackMember, carry) {
    disc[u] = ++carry.time;
    low[u] = carry.time;
    st.push(u);
    stackMember[u] = true;
    for (var v = 0; v < G[u].length; v++) {
    	if (G[u][v]) {
            if (disc[v] == -1) {
            	SCCVertex(v, disc, low, st, stackMember, carry);
                low[u]  = Math.min(low[u], low[v]);
            }
            else if (stackMember[v] == true) {
            	low[u]  = Math.min(low[u], disc[v]);
            }
        }
    }
    var w = 0;  
    if (low[u] == disc[u]) {
    	while (st[st.length-1] != u) {
    		w = st.pop();
    		stackMember[w] = false;
    	}
    	w = st.pop();
    	stackMember[w] = false;
    }
}
for (var i = 0; i < G.length; i++) {
    if (disc[i] == -1) {
        SCCVertex(i, disc, low, st, stackMember, carry);
    }
}