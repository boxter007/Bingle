var index = 0;

function inorder ( root , parent ) {
	if (root === -1) {
		logger._print( '没有节点，回退' )._wait ();
		return;
	}

	logger._print( '到达节点： ' + root);
	treeTracer._visit ( root , parent )._wait ();

	treeTracer._leave ( root );
	arrayTracer._notify ( index++, root )._wait();

	logger._print ( ' 从 ' + root +' 向左')._wait ();
	inorder(T[root][0], root);

	logger._print ( ' 从 ' + root +' 向右')._wait ();
	inorder(T[root][1], root);
}

inorder ( 5 ); // node with key 5 is the root
logger._print( '结束' );
