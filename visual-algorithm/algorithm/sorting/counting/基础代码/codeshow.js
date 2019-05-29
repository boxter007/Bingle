for (let i = 0; i < A.length; i++) {
    counts[A[i]]++;
}
var i = 0;
for (var j = 0; j <= maxValue; j++) {
    while (counts[j] > 0) {
        sortedA[i] = j;
        counts[j]--;
        i++;
    }
}