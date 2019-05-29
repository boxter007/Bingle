A[0] = 1;
A[1] = 1;
for (var i = 2; i <= N; i++) {
	for (var j = 0; j < i; j++) {
		A[i] += A[j] * A[i-j-1];
	}
}