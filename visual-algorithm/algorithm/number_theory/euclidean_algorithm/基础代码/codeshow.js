if(a[0] > a[1]) {
    var tmp = a[0];
    a[0] = a[1];
    a[1] = tmp;
}
while(a[0] > 0) {
    a[1] %= a[0];
    var tmp = a[0];
    a[0] = a[1];
    a[1] = tmp;
}
