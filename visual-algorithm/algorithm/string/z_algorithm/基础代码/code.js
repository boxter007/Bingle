function createZarr(concat) {
  var i,left,right,k,N;
  N=concat.length;
  left=0;
  right=0;
  logger._wait(1);
  logger._wait(2);
  logger._wait(3);
  logger._wait(4);
  for(i=1;i<N;i++) {
    tracer._select(i)._wait(5);
    logger._wait(6);
    if(i>right) {
      logger._wait(7);
      left=right=i;
      while(right<N && concat[right]==concat[right-left]) {

        concat_tracer._notify(right)._wait(8);
        concat_tracer._select(right-left);
        logger._print(concat[right]+" ( 位置 "+right+" ) == "+concat[right-left]+" (位置 "+(right-left)+")");
        concat_tracer._denotify(right)._wait(9);
        concat_tracer._deselect(right-left);
        right++;
      }
      concat_tracer._notify(right);
      concat_tracer._select(right-left);
      logger._print(concat[right]+" ( 位置 "+right+" ) != "+concat[right-left]+" (位置 "+(right-left)+")");
      concat_tracer._denotify(right)._wait(11);
      concat_tracer._deselect(right-left);
      z[i]=(right-left);
      
      right--;
    } else {
      logger._wait(14);
      if(z[i-left]<(right-i+1)) {
        concat_tracer._select(i-left);
        concat_tracer._notify(right-i+1)._wait(15);
        z[i]=z[i-left];
        concat_tracer._deselect(i-left);
        concat_tracer._denotify(right-i+1);
      } else {
        logger._wait(17);
        left=i;
        while (right<N && concat[right]==concat[right-left]) {
          concat_tracer._notify(right)._wait(18);
          concat_tracer._select(right-left);
          logger._print(concat[right]+" ( 位置 "+right+" ) == "+concat[right-left]+" (位置 "+(right-left)+")");
          concat_tracer._denotify(right);
          concat_tracer._deselect(right-left)._wait(19);
          right++;
        }
        concat_tracer._notify(right)._wait(21);
        concat_tracer._select(right-left);
        logger._print(concat[right]+" ( 位置 "+right+" ) != "+concat[right-left]+" (位置 "+(right-left)+")");
        concat_tracer._denotify(right);
        concat_tracer._deselect(right-left)._wait(22);
        z[i]=(right-left);
        right--;
      }
    }
    tracer._deselect(i);
    tracer._setData(z);
  }
}