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
/**
 * Determine if N is prime using Miller-Rabin probabilistic algorithm
 * @param  {Number} n The number
 * @param  {Number} k An integer that determine the accuracy of the solution
 * @return {Boolean}
 */
function testProbablyPrime(n, k) {
	logger._print("检测数字： " + n);
	logger._wait(12);
	if (n === 1 || n === 3) {
		logger._print("==> 素数：" + N);
		logger._wait(13);
		return true;
	}
	logger._wait(15);
	if (n % 2 === 0) {
		logger._print("==> 不是素数, " + n + " 是2的倍数");
		logger._wait(16);
		return false;
	}
	logger._wait(18);
	var d = n-1;
	while (d % 2 === 0) {
		logger._wait(19);
		logger._wait(20);
		d /= 2;
	}
	logger._print("d = " + d);

	// Do 5 iterations if none supplied
	logger._wait(22);
	k = k || 5;
	logger._wait(23);
	var P = 100 * (1 - (1/Math.pow(4, k)));

	WitnessLoop: do {
		logger._print("剩余迭代次数: #" + k);
		logger._wait(25);
		var a = 2 + Math.floor(Math.random() * (n - 4));
		logger._print("--> 第1次测试，使用随机数： " + a);
		logger._wait(26);
		var x = power(a, d, n);
		logger._wait(27);
		if (x === 1 || x === n - 1) {
			logger._wait(28);
			logger._wait(43);
			continue;
		}

		logger._print("--> 第2次测试");
		
		// Keep squaring x while one of the following doesn't
    	// happen
    	// (i)   d does not reach n-1
    	// (ii)  (x^2) % n is not 1
    	// (iii) (x^2) % n is not n-1
    	logger._wait(30);
    	var i = d;
    	while (i != n-1) {
    		logger._wait(31);
    		logger._wait(32);
    		x = (x * x) % n;
    		logger._wait(33);
    		i *= 2;
    		logger._wait(34);
    		if (x == 1) {
    			logger._print("--> 退出, " + n + " 是合数");
    			logger._wait(35);
    			return false;
    		}
    		logger._wait(37);
    		if (x == n-1) {
    			logger._wait(38);
    			logger._wait(43);
				continue WitnessLoop;
			}
    	}

		logger._print("--> 退出, " + n + " 是合数");
		logger._wait(41);
		return false;

	} while (--k);
 	logger._wait(44);
	logger._print("测试结束, " + n + " 是素数的可能性为 " + P + "%");
	return true;
}


var a = Math.floor(Math.random()*30000); if (a % 2 === 0) a += 1;
testProbablyPrime(a);
logger._print("----------");

a = Math.floor(Math.random()*3000); if (a % 2 === 0) a += 1;
testProbablyPrime(a);
logger._print("----------");

a = Math.floor(Math.random()*300); if (a % 2 === 0) a += 1;
testProbablyPrime(a);
logger._print("----------");

testProbablyPrime(151);
logger._print("----------");

testProbablyPrime(199, 10);