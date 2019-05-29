var a, b;
function extractUnstable(Q) {
  for (var k in Q) {
    if (Q[k].stable === false) {
      return Q[k];
    }
  }
}
while ((a = extractUnstable(A)) != null) {
  var bKey = a.rank_keys.shift();
  var b = B[bKey];
  if (b.stable === false) {
    a.stable = b;
    b.stable = a;
  } else {
    var rank_a_in_b = b.rank_keys.indexOf(a.key);
    var rank_prev_a_in_b = b.rank_keys.indexOf(b.stable.key);
    if (rank_a_in_b < rank_prev_a_in_b) {
      A[b.stable.key].stable = false;
      a.stable = b;
      b.stable = a;
    }
  }
}