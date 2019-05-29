// Initialize LIS values for all indexes
logger._wait(0);
for (var i = 0; i < A.length; i++) {
    logger._wait(1);
    LIS[i] = 1;
    logger._wait(0);
}

//logger._print('Calculating Longest Increasing Subsequence values in bottom up manner ');
// Compute optimized LIS values in bottom up manner

for (var i = 1; i < A.length; i++) {
    logger._wait(3);
    tracer._select(i);
    logger._print(' LIS[' + i + '] = ' + LIS[i]);
    logger._wait(4);
    for (var j = 0; j < i; j++) {
        tracer._notify(j)._wait();
        tracer._denotify(j);
        logger._wait(5);
        if (A[i] > A[j] && LIS[i] < LIS[j] + 1) {
            logger._wait(6);
            LIS[i] = LIS[j] + 1;
            logger._print(' LIS[' + i + '] = ' + LIS[i]);
        }
        logger._wait(4);
    }
    tracer._deselect(i)._wait(3);
}

// Pick maximum of all LIS values
//logger._print('开始计算最大的一个');
logger._wait(10);
var max = LIS[0];
for (var i = 1; i < A.length; i++) {
    logger._wait(11);
    logger._wait(12);
	if (max < LIS[i]) {
		logger._wait(13);
        max = LIS[i];
	}
    logger._wait(11);
}
logger._print('最长递增子序列： ' + max);