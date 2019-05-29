logger._print("1 不是素数");
tracer._select(0)._wait();
for (var i = 2; i <= N; i++) {
  if (b[i] === 0) {
    logger._print(i + " 没有标记为合数，它是素数");
    tracer._notify(i - 1)._wait();
    for (var j = i + i; j <= N; j += i) {
      b[j] = 1; 
      logger._print(j + " 是 " + i + "的倍数，标记为合数");
      tracer._select(j - 1)._wait();
    }
    //tracer._denotify(i - 1);
  }
}
logger._print("从1 到 " + N + ' 之间的素数已经使用红色标记');
