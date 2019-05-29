var sum = D[0] + D[1] + D[2];
var max = sum;
for (var i = 3; i < D.length; i++) {
    sum += D[i] - D[i - 3];
    if (max < sum) 
    	max = sum;
}