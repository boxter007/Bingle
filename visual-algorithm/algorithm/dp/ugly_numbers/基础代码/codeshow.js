for ( var i = 1; i < N; i++ ) {
	var next = (M[0] <= M[1])?( M[0] <= M[2] )?M[0]:M[2]:( M[1] <= M[2] )?M[1]:M[2];
	A[i] = next;
	if ( next === M[0] ) {
		I[0]++;
		M[0] = A[I[0]] * 2;
	}
	if ( next === M[1] ) {
		I[1]++;
		M[1] = A[I[1]] * 3;
	}
	if ( next === M[2] ) {
		I[2]++;
		M[2] = A[I[2]] * 5;
	}
}