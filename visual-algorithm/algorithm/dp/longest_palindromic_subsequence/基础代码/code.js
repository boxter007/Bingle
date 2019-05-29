function max(a,b) {
  logger._wait(1);
  if(a>b){
    logger._wait(2);
    return a;
  } else {
    logger._wait(4);
    return b;
  }
}
//logger._print("LPS for any string with length = 1 is 1");
for(i=2;i<=N;i++) {
  logger._wait(7);
  logger._print("--------------------------------------------------");
  logger._print("考虑长度为： " + i + " 的子字符串");
  logger._print("--------------------------------------------------");
  for(j=0;j<N-i+1;j++) {
    logger._wait(8);
    var k = j+i-1;
    tracer._select(j)._wait(9);
    tracer._notify(k)._wait(10);

    logger._print("比较 "+seq[j] + " 和 "+seq[k]);

    if(seq[j]==seq[k] && i==2) {
      //logger._print("结果：They are equal and size of the string in the interval"+j+" to "+k+" is 2, so the Longest Palindromic Subsequence in the Given range is 2");

      matrix._notify(j,k)._wait(11);

      L[j][k]=2;
      matrix._setData(L);

      matrix._denotify(j,k)._wait();

    } else if(seq[j]==seq[k]) {
      //logger._print("They are equal, so the Longest Palindromic Subsequence in the Given range is 2 + the Longest Increasing Subsequence between the indices "+(j+1)+" to "+(k-1));

      matrix._notify(j,k)._wait(12);
      matrix._select(j+1,k-1)._wait(13);

      L[j][k] = L[j+1][k-1] + 2;
      matrix._setData(L);

      matrix._denotify(j,k)._wait();
      matrix._deselect(j+1,k-1)._wait();

    } else {
    //  logger._print("They are NOT equal, so the Longest Palindromic Subsequence in the Given range is the maximum Longest Increasing Subsequence between the indices "+(j+1)+" to "+(k) + " and "+(j)+" to "+(k-1));
      matrix._notify(j,k)._wait();
      matrix._select(j+1,k)._wait();
      matrix._select(j,k-1)._wait(15);

      L[j][k] = max(L[j+1][k],L[j][k-1]);
      matrix._setData(L);

      matrix._denotify(j,k)._wait();
      matrix._deselect(j+1,k)._wait();
      matrix._deselect(j,k-1)._wait();
    }
   // logger._print("--------------------------------------------------");
    tracer._deselect(j)._wait();
    tracer._denotify(k)._wait();
  }
}
logger._print("最长回文子序列长度为："+L[0][N-1]);
