function BELLMAN_FORD(src, dest) {
  var weights = new Array(G.length), i, j;
  tracer._wait(1);
  for (i = 0; i < G.length; i++) {
    tracer._wait(2);
    weights[i] = MAX_VALUE;
    tracer._wait(3);
    tracer._weight(i, weights[i]);
  }
  tracer._wait(5);
  weights[src] = 0;
  tracer._weight(src, 0);

  logger._print('初始化结果向量: [' + weights + ']');
  logger._print('');

  tracer._wait(6);
  var k = G.length;
  while (k--) {
    tracer._wait(7);
    logger._print('第 ' + (G.length - k) + ' 次迭代');
    logger._print('------------------------------');

    for (i = 0; i < G.length; i++) {
      tracer._wait(8);
      for (j = 0; j < G.length; j++) {
        tracer._wait(9);
        tracer._wait(10);
        if (G[i][j]) {	//proceed to relax Edges only if a particular weight != 0 (0 represents no edge)
          tracer._wait(11);
          if (weights[j] > (weights[i] + G[i][j])) {
            tracer._wait(12);
            weights[j] = weights[i] + G[i][j];
            logger._print('weights[' + j + '] = weights[' + i + '] + ' + G[i][j]);
          }
          tracer._visit(j, i, weights[j])._wait();
          tracer._leave(j, i)._wait();
        }
      }
    }

    logger._print('更新结果向量: [' + weights.join(', ') + ']');
    logger._print('');
  }

  logger._print('查找是否循环');
  for (i = 0; i < G.length; i++) {
    tracer._wait(18);
    for (j = 0; j < G.length; j++) {
      tracer._wait(19);
      tracer._wait(20);
      if (G[i][j]) {
        tracer._wait(21);
        if (weights[j] > (weights[i] + G[i][j])) {
          tracer._wait(22);
          logger._print('找到一个循环： weights[' + j + '] > weights[' + i + '] + ' + G[i][j]);
          return (MAX_VALUE);
        }
      }
    }
  }
  tracer._wait(27);
  logger._print('没有发现循环。从 ' + src + ' 开始的结果向量为： [' + weights + ']');

  return weights[dest];
}
tracer._wait(30);
var src = Integer.random(0, G.length - 1), dest;
tracer._wait(31);
var MAX_VALUE = Infinity;
tracer._wait(32);
var minWeight;
tracer._wait(33);
do {
  tracer._wait(34);
  dest = Integer.random(0, G.length - 1);
  tracer._wait(35);
}while (src === dest);

logger._print('从 ' + src + ' 到 ' + dest + ' 寻找最短路径');
tracer._wait(36);
minWeight = BELLMAN_FORD(src, dest);

if (minWeight === MAX_VALUE) {
  logger._print('从 ' + src + ' 到 ' + dest + ' 没有找到路径');
} else {
  logger._print('从 ' + src + ' 到 ' + dest + ' 找到最短路径： ' + minWeight);
}