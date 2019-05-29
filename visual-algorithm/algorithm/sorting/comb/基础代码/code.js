logger._print('原始数组 [' + D.join(', ') + ']');
logger._wait(0);
var N = D.length;
logger._wait(1);
var swapped;
logger._wait(2);
var gap = N;  
logger._wait(3);          // initialize gap size
var shrink = 1.3;       // set the gap shrink factor

do{
    // update the gap value for the next comb.
    logger._wait(5);
    gap = Math.floor( gap/shrink );
    logger._wait(6);
    if( gap < 1 ){
        // minimum gap is 1
        logger._wait(7);
        gap = 1;
    }
    logger._wait(9);
    swapped = false;    // initialize swapped
    // a single comb over the input list
    for( var i=0; i+gap < N; i++ ){
        tracer._select(i)._select(i+gap)._wait(10);
        logger._wait(11);
        if( D[i] > D[i+gap] ){
            logger._print('交换 ' + D[i] + ' 和 ' + D[i+gap]);     // log swap event
            logger._wait(12);
            var temp = D[i];
            logger._wait(13);
            D[i] = D[i+gap];
            logger._wait(14);
            D[i+gap] = temp;

            tracer._notify(i, D[i])._notify(i+gap, D[i+gap])._wait(15);
            tracer._denotify(i)._denotify(i+gap);

            swapped = true;     // Flag swapped has happened and list is not guaranteed sorted
        }
        tracer._deselect(i)._deselect(i+gap);
    } // End of combing
    logger._wait(18);
} while( gap!=1 || swapped  )