var N = D.length;
function flip (start) {
  var idx = 0;
  for (var i=start;i<(start+N)/2;i++) {
    var temp = D[i];
    D[i] = D[N-idx-1];
    D[N-idx-1] = temp;
    idx++;
  }
}
for (var i=0;i<N-1;i++) {
  var currArr = D.slice(i, N);
  var currMax = currArr.reduce((prev, curr, idx) => {
    return (curr > prev.val) ? { idx: idx, val: curr} : prev;
  }, {idx: 0, val: currArr[0]});
  if (currMax.idx !== 0) { 
    flip(currMax.idx+i, N);
    flip(i, N);
  }
}