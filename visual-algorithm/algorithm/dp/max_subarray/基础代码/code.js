var maxSubarraySum = (function maxSubarray(array) {
    logger._print('初始化变量');
    var maxSoFar = 0, maxEndingHere = 0; logger._wait(1);

    for (var i = 0; i < array.length; i++) {
        logger._wait(2);        
        tracer._select(i);
        logger._print(maxEndingHere + ' + ' + array[i]);
        logger._wait(3);
        maxEndingHere += array[i];
        logger._print('=> ' + maxEndingHere);
        logger._wait(4);
        if (maxEndingHere < 0) {
            logger._print('maxEndingHere 为负数, 设置成0');
            logger._wait(5);
            maxEndingHere = 0;
        }
        logger._wait(7);
        if (maxSoFar < maxEndingHere) {
            logger._print('设置结果为： (' + maxEndingHere + ')');
            logger._wait(8);
            maxSoFar = maxEndingHere;
        }

        tracer._wait();
        tracer._deselect(i);
    }
    logger._wait(11);
    return maxSoFar;
})(D);

logger._print('最大子序列之和为： ' + maxSubarraySum);