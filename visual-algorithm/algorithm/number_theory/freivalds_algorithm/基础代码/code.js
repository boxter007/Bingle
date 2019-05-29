function FreivaldsAlgorithm() {
	_r._wait(1);
	var k = 5;
	_r._wait(1);
	var i, j, tmp, tmpB, tmpC, n = A.length;

	while (k--) {
		_r._wait(3);
		// Generate random vector
		_r._wait(4);
		var r = [], P = [];
		for (i = 0; i < n; i++) {
			_r._wait(5);
			_r._wait(6);
			P.push(-1);
			_r._wait(7);
			r.push( (Math.random() < 0.5) << 0);
		}
		_r._setData(r)._wait(9);

		// Compute Br, Cr
		var Br = [], Cr = [];
		for (i = 0; i < n; i++) {
			_r._wait(10);
			_r._wait(11);
			tmpB = 0; 
			_r._wait(12);
			tmpC = 0;
			for (j = 0; j < n; j++) {
				_r._wait(13);
				_r._wait(14); 
				tmpB += r[j] * B[j][i];
				_r._wait(15);
				tmpC += r[j] * C[j][i];
			}
			_r._wait(17);
			Br.push(tmpB);
			_r._wait(18);
			Cr.push(tmpC);
		}

		// Compute A * Br - Cr
		_r._wait(20);
		P = [];
		for (i = 0; i < n; i++) {
			_r._wait(21);
			_r._wait(22);
			tmp = 0;
			for (j = 0; j < n; j++) { 
				_r._wait(23);
				_r._wait(24);
				tmp += (A[i][j] * Br[i]) - Cr[i];
			}
			_r._wait(26);
			P.push(tmp);
		}
		_p._setData(P)._wait();

		for (i = 0; i < n; i++) {
			_r._wait(28);
			_r._wait(29);
			if (P[i] !== 0) {
				_r._wait(30);
				return false;
			}
		}
	}
	_r._wait(34);
	return true;
}
_r._wait(36);
FreivaldsAlgorithm();