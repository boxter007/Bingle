var N = D.length;
var swapped;
var gap = N;            
var shrink = 1.3;       
do{
    gap = Math.floor( gap/shrink );
    if( gap < 1 ){
        gap = 1;
    }
    swapped = false;
    for( var i=0; i+gap < N; i++ ){
        if( D[i] > D[i+gap] ){
            var temp = D[i];
            D[i] = D[i+gap];
            D[i+gap] = temp;
            swapped = true;    
        }
    } 
} while( gap!=1 || swapped  )