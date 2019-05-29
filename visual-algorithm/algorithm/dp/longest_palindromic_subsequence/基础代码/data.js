
var tracer = new Array1DTracer('字符串');
var matrix = new Array2DTracer('矩阵');
var logger = new LogTracer('控制台');


var seq = "BBABCBCAB";
var N;
N = seq.length;


var L = new Array(N);

var i,j;
for(i=0;i<N;i++) {
  L[i]= new Array(N);
}
for(i=0;i<N;i++) {
  L[i][i]=1;
}

tracer._setData(seq);
matrix._setData(L);
