function SCCVertex(u, disc, low,  st, stackMember, carry) 
{
	graphTracer._visit(u)._wait(1);

    disc[u] = ++carry.time;
    discTracer._notify(u, carry.time)._wait(2);

    low[u] = carry.time;
    lowTracer._notify(u, carry.time)._wait(3);

    st.push(u);
    stTracer._setData(st)._wait(4);

    stackMember[u] = true;
    stackMemberTracer._notify(u, true);

    // Go through all vertices adjacent to this
    for (var v = 0; v < G[u].length; v++) {
        logger._wait(5);
        logger._wait(6);
    	if (G[u][v]) {
            logger._wait(7);
            // If v is not visited yet, then recur for it
            if (disc[v] == -1) {
                logger._wait(8);
            	SCCVertex(v, disc, low, st, stackMember, carry);

                // Check if the subtree rooted with 'v' has a
                // connection to one of the ancestors of 'u'
                low[u]  = Math.min(low[u], low[v]);
                logger._wait(9);
                lowTracer._notify(u, low[u]);
            }

            // Update low value of 'u' only of 'v' is still in stack
            // (i.e. it's a back edge, not cross edge).
            else if (stackMember[v] == true) {
                logger._wait(11);
                logger._wait(12);
            	low[u]  = Math.min(low[u], disc[v]);
            	lowTracer._notify(u, low[u])._wait();
            }

        }
    }
    logger._wait(16);
    // head node found, pop the stack and print an SCC
    var w = 0;  // To store stack extracted vertices
    logger._wait(17);
    if (low[u] == disc[u]) {
    	
    	while (st[st.length-1] != u) {
            logger._wait(18);
    		w = st.pop();
    		stTracer._setData(st)._wait(19);
    	
    		logger._print(w)._wait(20);

    		stackMember[w] = false;
    		stackMemberTracer._notify(w, false)._wait();
    	}
        logger._wait(22);
    	w = st.pop();
    	stTracer._setData(st)._wait();

    	logger._print(w)._wait(23);
    	logger._print('------');

    	stackMember[w] = false;
    	stackMemberTracer._notify(w, false)._wait();
    }
}

for (var i = 0; i < G.length; i++) {
    logger._wait(26);
    logger._wait(27);
    if (disc[i] == -1) {
        logger._wait(28);
        SCCVertex(i, disc, low, st, stackMember, carry);
    }
}