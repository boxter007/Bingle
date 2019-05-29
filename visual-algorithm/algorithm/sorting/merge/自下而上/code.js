logger._print('原始数组 = [' + D[0].join(', ') + ']');

function mergeSort(start, end) {
    if (Math.abs(end - start) <= 1) return;

    var mergeFrom = 0, mergeTo = 1, width, i;
    for (width = 1; width < end; width = width * 2) {
        /**/logger._print('合并数字宽度: ' + width);
        for (i = 0; i < end; i = i + 2 * width) {
            merge(mergeFrom, i, Math.min(i + width, end), Math.min(i + 2 * width, end), mergeTo);
        }
        //this could be copy(mergeTo, mergeFrom, start, end);
        //but it is more effecient to swap the input arrays
        //if you did copy here, you wouldn't need the copy at the end
        mergeFrom = (mergeFrom === 0 ? 1 : 0);
        mergeTo = 1 - mergeFrom;
    }
    if (mergeFrom !== 0) {
        /**/logger._print('最终合并');
        copy(mergeFrom, mergeTo, start, end);
    }
}

function merge(mergeFrom, start, middle, end, mergeTo) {
    var i = start, j = middle, k;
    //in an actual merge implementation, mergeFrom and mergeTo would be arrays
    //here for the ability to trace what is going on better, the arrays are D[mergeFrom] and D[mergeTo]
    /**/logger._print('合并分区 [' + start + '..' + middle + '] 和 [' + middle + '..' + end + ']');
    /**/tracer._selectRow(mergeFrom, start, end-1)._wait();
    /**/tracer._deselectRow(mergeFrom, start, end-1);

    for (k = start; k < end; k++) {
        /**/if (j < end) {
            /**/    tracer._select(mergeFrom, j);
                    chart._select( j);
            /**/}
        /**/if (i < middle) {
            /**/    tracer._select(mergeFrom, i);
                    chart._select(i);
            /**/}
        /**/if (i < middle && j < end) {
            /**/    logger._print('比较索引 ' + i + ' 和 ' + j + ', 值: ' + D[mergeFrom][i] + ' 和 ' + D[mergeFrom][j])._wait();
            /**/}

        if (i < middle && (j >= end || D[mergeFrom][i] <= D[mergeFrom][j])) {

            /**/tracer._notify(mergeTo, k, D[mergeFrom][i]);
                chart._notify(k, D[mergeFrom][i])._wait();
            /**/tracer._denotify(mergeTo, k);
                chart._denotify( k);
            /**/tracer._deselect(mergeFrom, i);
                chart._deselect( i);

            D[mergeTo][k] = D[mergeFrom][i];
            i = i + 1;
        } else {
            
            /**/tracer._notify(mergeTo, k, D[mergeFrom][j]);
                chart._notify( k, D[mergeFrom][j])._wait();
            /**/tracer._denotify(mergeTo, k);
                chart._denotify( k);
            /**/tracer._deselect(mergeFrom, j);
                chart._deselect( j);

            D[mergeTo][k] = D[mergeFrom][j];
            j = j + 1;
        }
    }
}

function copy(mergeFrom, mergeTo, start, end) {
    var i;
    for (i = start; i < end; i++) {
        /**/tracer._select(mergeFrom, i);
            chart._select( i);
        /**/tracer._notify(mergeTo, i, D[mergeFrom][i]);
            chart._notify( i, D[mergeFrom][i])._wait();

        D[mergeTo][i] = D[mergeFrom][i];

        /**/tracer._deselect(mergeFrom, i);
            chart._deselect( i);
        /**/tracer._denotify(mergeTo, i);
            chart._denotify( i);
    }
}
mergeSort(0, D[0].length);