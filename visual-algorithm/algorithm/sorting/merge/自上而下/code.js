logger._print('原始数组 = [' + D.join(', ') + ']');

function mergeSort(start, end) {
    if (Math.abs(end - start) <= 1) return [];
    var middle = Math.ceil((start + end) / 2);

    mergeSort(start, middle);
    mergeSort(middle, end);

    logger._print('拆分 左侧[' + start + ', ' + (middle - 1) + '], 右侧[' + (middle) + ', ' + (end - 1) + ']');
    return mergeSort.merge(start, middle, end);
}

mergeSort.merge = function (start, middle, end) {
    var leftSize = middle - start;
    var rightSize = end - middle;
    var maxSize = Math.max(leftSize, rightSize);
    var size = end - start;
    var left = [];
    var right = [];
    var i;

    for (i = 0; i < maxSize; i++) {
        if (i < leftSize) {
            left.push(D[start + i]);
            tracer._select(start + i);
            logger._print('在左侧插入值[' + i + '] = ' + D[start + i])._wait();
        }
        if (i < rightSize) {
            right.push(D[middle + i]);
            tracer._select(middle + i);
            logger._print('在右侧插入值[' + i + '] = ' + D[middle + i])._wait();
        }
    }
    logger._print('左侧 = [' + left.join(', ') + '], ' + '右侧 = [' + right.join(', ') + ']');

    i = 0;
    while (i < size) {
        if (left[0] && right[0]) {
            if (left[0] > right[0]) {
                D[start + i] = right.shift();
                logger._print('重写右侧数组[' + i + '] = ' + D[start + i]);
            } else {
                D[start + i] = left.shift();
                logger._print('重写左侧数组[' + i + '] = ' + D[start + i]);
            }
        } else if (left[0]) {
            D[start + i] = left.shift();
            logger._print('重写左侧数组[' + i + '] = ' + D[start + i]);
        } else {
            D[start + i] = right.shift();
            logger._print('重写右侧数组[' + i + '] = ' + D[start + i]);
        }

        tracer._deselect(start + i);
        tracer._notify(start + i, D[start + i])._wait();
        tracer._denotify(start + i);
        i++;
    }

    var tempArray = [];
    for (i = start; i < end; i++) tempArray.push(D[i]);
    logger._print('合并数组 = [' + tempArray.join(', ') + ']');
};
mergeSort(0, D.length);