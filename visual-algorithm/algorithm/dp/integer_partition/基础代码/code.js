function partition(A, n, p){
  tracer._wait(1)
  if (n === 0) {
    tracer._wait(2);
    tracer.logTracer._print('[' + A.join(', ') + ']');
  }
  else {
    tracer._wait(4);
    var end = n;
    tracer._wait(5);
    if (p !== 0 && A[p-1] < n) {
      tracer._wait(6);
      end = A[p-1];
    }

    for (var i = end; i > 0; i--){
      tracer._wait(7);
      tracer._wait(8);
      A[p] = i;
      tracer._wait(9);
      partition(A, n-i, p+1);
    }
    tracer._wait(11);
  }
  tracer._wait(12);
}

function integerPartition(n){
  //Calculate number of partitions for all numbers from 1 to n
  for (var i = 2; i <= n; i++){
    tracer._wait(14);
    // We are allowed to use numbers from 2 to i
    for (var j = 1; j <= i; j++){
      tracer._wait(15);
      // Number of partitions without j number + number of partitions with max j
      tracer._select(i, j)._wait();
      D[i][j] = D[i][j-1] + D[i-j][Math.max(j, i-j)];
      tracer._notify(i, j, D[i][j])._wait(16);
      tracer._denotify(i, j);
      tracer._deselect(i, j);
    }
  }
  tracer._wait(19);
  return D[n][n];
}

tracer.logTracer._print('分区: ' + integer);
tracer._wait(21);
partition(A, integer, 0);
tracer._wait(22);
var part = integerPartition(integer);
tracer.logTracer._print(part);