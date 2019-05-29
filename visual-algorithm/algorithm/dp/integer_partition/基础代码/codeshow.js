function partition(A, n, p){
  if (n === 0) 
    tracer.logTracer.print('[' + A.join(', ') + ']');
  else {
    var end = n;
    if (p !== 0 && A[p-1] < n) 
      end = A[p-1];
    for (var i = end; i > 0; i--){
        A[p] = i;
        partition(A, n-i, p+1);
    }
  }
}
function integerPartition(n){
  for (var i = 2; i <= n; i++){
    for (var j = 1; j <= i; j++){
      D[i][j] = D[i][j-1] + D[i-j][Math.max(j, i-j)];
    }
  }
  return D[n][n];
}
partition(A, integer, 0);
var part = integerPartition(integer);