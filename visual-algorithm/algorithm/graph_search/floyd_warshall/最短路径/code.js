function FloydWarshall() {
  for (i = 0; i < G.length; i++) {
    logger._wait(1);
    for (var j = 0; j < G.length; j++) {
      logger._wait(2);
      // Distance to self is always 0
      logger._wait(3);
      if (i == j){
        logger._wait(4);
        S[i][i] = 0;
      } 
      // Distance between connected nodes is their weight
      else if (G[i][j] > 0) {
        logger._wait(6);
        logger._wait(7);
        S[i][j] = G[i][j];
      }// Else we don't know the distance and we set it to infinity
      else{
        logger._wait(10);
        S[i][j] = MAX_VALUE;
      } 
    }
  }
  // If there is a shorter path using k, use it instead
  for (var k = 0; k < G.length; k++) {
    logger._wait(14);
    for (i = 0; i < G.length; i++) {
      logger._wait(15);
      logger._wait(16);
      if (k === i) {
      logger._wait(17);
        continue;
      }
      tracer._visit(k, i)._wait();
      for (j = 0; j < G.length; j++) {
        logger._wait(19);
        logger._wait(20);
        if (i === j || j === k) {
          logger._wait(21);
          continue;
        }
        tracer._visit(j, k)._wait(23);
        if (S[i][j] > S[i][k] + S[k][j]) {
          tracer._visit(j, i, S[i][j])._wait(24);
          S[i][j] = S[i][k] + S[k][j];
          tracer._leave(j, i, S[i][j]);
        }
        tracer._leave(j, k);
      }
      tracer._leave(k, i)._wait();
    }
  }
  for (i = 0; i < G.length; i++)
    for (j = 0; j < G.length; j++)
      if (S[i][j] === MAX_VALUE) logger._print('从 ' + i + ' 到 ' + j + ' 没有路径');
      else logger._print('从 ' + i + ' 到 ' + j + ' 最短路径为： ' + S[i][j]);
}
logger._wait(30);
var MAX_VALUE = Infinity;
logger._print('找到所有节点间最短的路径');
logger._wait(31);
FloydWarshall();