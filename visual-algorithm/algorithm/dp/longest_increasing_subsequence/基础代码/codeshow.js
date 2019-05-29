for (var i = 0; i < A.length; i++) {
    LIS[i] = 1;
}
for (var i = 1; i < A.length; i++) {
    for (var j = 0; j < i; j++) {
        if (A[i] > A[j] && LIS[i] < LIS[j] + 1) {
            LIS[i] = LIS[j] + 1;
        }
    }
}
var max = LIS[0];
for (var i = 1; i < A.length; i++) {
	if (max < LIS[i]) {
		max = LIS[i];
	}
}