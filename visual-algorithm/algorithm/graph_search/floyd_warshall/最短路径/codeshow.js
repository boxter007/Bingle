function FloydWarshall() {
  for (i = 0; i < G.length; i++) {
    for (var j = 0; j < G.length; j++) {
      if (i == j){
        S[i][i] = 0;
      } 
      else if (G[i][j] > 0) {
        S[i][j] = G[i][j];
      }
      else{
        S[i][j] = MAX_VALUE;
      } 
    }
  }
  for (var k = 0; k < G.length; k++) {
    for (i = 0; i < G.length; i++) {
      if (k === i) {
        continue;
      }
      for (j = 0; j < G.length; j++) {
        if (i === j || j === k) {
          continue;
        }
        if (S[i][j] > S[i][k] + S[k][j]) {
          S[i][j] = S[i][k] + S[k][j];
        }
      }
    }
  }
}
var MAX_VALUE = Infinity;
FloydWarshall();