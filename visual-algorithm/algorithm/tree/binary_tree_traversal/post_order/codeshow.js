var index = 0;
function inorder ( root , parent ) {
	if (root === -1) {
		return;
	}
	inorder(T[root][0], root);
	inorder(T[root][1], root);
}
inorder ( 5 ); 