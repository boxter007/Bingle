logger._wait(0);
var sum = D[0] + D[1] + D[2];
logger._print('（' + D[0] + '） + （' + D[1] + '） + （' + D[2]  + '） = ' + sum);
logger._wait(1);
var max = sum;
var cur = 0;
tracer._select(0, 2);

for (var i = 3; i < D.length; i++) {
    logger._wait(2);
    sum += D[i] - D[i - 3];
    logger._wait(3);
    logger._print('（' + D[i-2] + '） + （' + D[i-1] + '） + （' + D[i]  + '） = ' + sum);
    logger._wait(4);
    if (max < sum){
    	max = sum;
    	cur = i - 2;
    	logger._wait(5);	
    } 
    tracer._deselect(i - 3);
    tracer._select(i);
}
tracer._deselect(D.length - 3, D.length - 1);
tracer._select(cur,cur+2);
logger._print('最大值 = ' + max);