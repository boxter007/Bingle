logTracer._wait(0);
var a, b;
function extractUnstable(Q) {
  for (var k in Q) {
    logTracer._wait(2);
    logTracer._wait(3);
    if (Q[k].stable === false) {
      logTracer._wait(4);
      return Q[k];
    }
  }
}
while ((a = extractUnstable(A)) != null) {
  logTracer._wait(8);
  logTracer._wait(9);
  var bKey = a.rank_keys.shift();
  logTracer._print('选定 ' + a.key)._wait(10);
  var b = B[bKey];
  
  logTracer._print('--> 与 ' + b.key + ' 匹配')._wait(11);

  if (b.stable === false) {
  
    logTracer._print('--> ' + b.key + ' 是不稳定的， ' + b.key + ' 与 ' + a.key + ' 是稳定的')._wait(12);
 
    a.stable = b;
    logTracer._wait(13);
    b.stable = a;
 
    tracerA._select(_aKeys.indexOf(a.key))._wait();
    tracerB._select(_bKeys.indexOf(b.key))._wait();

  } else {
    logTracer._wait(15);
    var rank_a_in_b = b.rank_keys.indexOf(a.key);
    logTracer._wait(16);
    var rank_prev_a_in_b = b.rank_keys.indexOf(b.stable.key);
    logTracer._wait(17);
    if (rank_a_in_b < rank_prev_a_in_b) {
   
      logTracer._print('--> ' + bKey + ' 与 ' + a.key + ' 比 '  + bKey + ' 与 '+ b.stable.key + ' 更稳定')._wait(18);
 
      A[b.stable.key].stable = false;
      tracerA._deselect(_aKeys.indexOf(b.stable.key))._wait();
      logTracer._wait(19);
      a.stable = b;
      logTracer._wait(20);
      b.stable = a;
      tracerA._select(_aKeys.indexOf(a.key))._wait();
      tracerB._select(_bKeys.indexOf(b.key))._wait();
    }
  }
}