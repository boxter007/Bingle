function createZarr(concat) {
  var i,left,right,k,N;
  N=concat.length;
  left=0;
  right=0;
  for(i=1;i<N;i++) {
    if(i>right) {
      left=right=i;
      while(right<N && concat[right]==concat[right-left]) {
        right++;
      }
      z[i]=(right-left);
      right--;
    } else {
      if(z[i-left]<(right-i+1)) {
        z[i]=z[i-left];
      } else {
        left=i;
        while (right<N && concat[right]==concat[right-left]) {
          right++;
        }
        z[i]=(right-left);
        right--;
      }
    }
  }
}
