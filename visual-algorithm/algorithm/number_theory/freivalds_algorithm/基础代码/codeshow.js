function FreivaldsAlgorithm() {
	var k = 5;
	var i, j, tmp, tmpB, tmpC, n = A.length;
	while (k--) {
		var r = [], P = [];
		for (i = 0; i < n; i++) {
			P.push(-1);
			r.push( (Math.random() < 0.5) << 0);
		}
		var Br = [], Cr = [];
		for (i = 0; i < n; i++) {
			tmpB = 0; 
			tmpC = 0;
			for (j = 0; j < n; j++) { 
				tmpB += r[j] * B[j][i];
				tmpC += r[j] * C[j][i];
			}
			Br.push(tmpB);
			Cr.push(tmpC);
		}
		P = [];
		for (i = 0; i < n; i++) {
			tmp = 0;
			for (j = 0; j < n; j++) { 
				tmp += (A[i][j] * Br[i]) - Cr[i];
			}
			P.push(tmp);
		}
		for (i = 0; i < n; i++) {
			if (P[i] !== 0) {
				return false;
			}
		}
	}
	return true;
}
FreivaldsAlgorithm();