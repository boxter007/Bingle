function partition(D, low, high) {
    var i, j, s;
    while (high > low) {
        i = low;
        j = high;
        s = D[low];
        while (i < j) {
            while (D[j] > s){ 
                j--;
            }
            D[i] = D[j];
            while (s >= D[i] && i < j){ 
                i++;
            }
            D[j] = D[i];
        }
        D[i] = s;
        partition(D, low, i-1);
        low = i+1;
    }
}
function quicksort(D) {
       partition(D, 0, D.length-1);
}
quicksort(D);