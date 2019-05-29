logger._print('原始数组 = [' + D.join(', ') + ']');
logger._wait(0);
var N = D.length;
function flip (start) {
  tracer._select(start, N)._wait(2);
  var idx = 0;
  for (var i=start;i<(start+N)/2;i++) {
    tracer._select(i)._wait(3);
    logger._wait(4);
    var temp = D[i];
    logger._wait(5);
    D[i] = D[N-idx-1];
    logger._wait(6);
    D[N-idx-1] = temp;
    idx++;
    tracer._notify(i, D[i])._notify(N-idx, D[N-idx])._wait(7);
    tracer._denotify(i)._denotify(N-idx);
    tracer._deselect(i);
  }
  tracer._deselect(start, N);
}
for (var i=0;i<N-1;i++) {
  logger._wait(10);
  logger._print('第 ' + (i+1) + ' 轮');
  logger._wait(11);
  var currArr = D.slice(i, N);
  logger._wait(12);
  var currMax = currArr.reduce((prev, curr, idx) => {
    return (curr > prev.val) ? { idx: idx, val: curr} : prev;
  }, {idx: 0, val: currArr[0]});
  logger._wait(15);
  if (currMax.idx !== 0) { // if currMax.idx === 0 that means max element already at the bottom, no flip required
    logger._print('第一次翻转 ' + (currMax.idx+i) );
    logger._wait(16);
    flip(currMax.idx+i, N);
    logger._print('第二次翻转 ' + (i) );
    logger._wait(17);
    flip(i, N);
  }
}