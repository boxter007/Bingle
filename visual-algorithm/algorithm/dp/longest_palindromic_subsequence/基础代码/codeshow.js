function max(a,b) {
  if(a>b){
    return a;
  } else {
    return b;
  }
}
for(i=2;i<=N;i++) {
  for(j=0;j<N-i+1;j++) {
    var k = j+i-1;
    if(seq[j]==seq[k] && i==2) {
      L[j][k]=2;
    } else if(seq[j]==seq[k]) {
      L[j][k] = L[j+1][k-1] + 2;
    } else {
      L[j][k] = max(L[j+1][k],L[j][k-1]);
    }
  }
}