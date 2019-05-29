function power(x, y, p)
{
	var res = 1;
	x = x % p;
	while (y > 0) {
      if (y & 1) res = (res*x) % p;
      y = y>>1; 
      x = (x*x) % p;
   }
   return res;
}
function testProbablyPrime(n, k) {
	if (n === 1 || n === 3) {
		return true;
	}
	if (n % 2 === 0) {
		return false;
	}
	var d = n-1;
	while (d % 2 === 0) {
		d /= 2;
	}
	k = k || 5;
	var P = 100 * (1 - (1/Math.pow(4, k)));
	WitnessLoop: do {
		var a = 2 + Math.floor(Math.random() * (n - 4));
		var x = power(a, d, n);
		if (x === 1 || x === n - 1) {
			continue;
		}
    	var i = d;
    	while (i != n-1) {
    		x = (x * x) % n;
    		i *= 2;
    		if (x == 1) {
    			return false;
    		}
    		if (x == n-1) {
				continue WitnessLoop;
			}
    	}
		return false;

	} while (--k);
	return true;
}
var a = Math.floor(Math.random()*30000); if (a % 2 === 0) a += 1;
testProbablyPrime(a);
a = Math.floor(Math.random()*3000); if (a % 2 === 0) a += 1;
testProbablyPrime(a);
a = Math.floor(Math.random()*300); if (a % 2 === 0) a += 1;
testProbablyPrime(a);
testProbablyPrime(151);
testProbablyPrime(199, 10);