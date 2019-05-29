function sort(a){
   if (a.length <= 1)
        return a;
    var mid = parseInt(a.length/2);
    var left = [];
    var right = [];
    var center = [];
    for(var item = 0; item < a.length ; item ++){
        if (item < a[mid])
            left.push(item);
        else if (item > a[mid])
            right.push(item);
        else
            center.push(item);
    }
    var x = sort(left)+center+sort(right); 
    return x;
}
sort(D);