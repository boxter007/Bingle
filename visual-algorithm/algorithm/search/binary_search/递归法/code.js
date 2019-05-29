function BinarySearch(array, element, minIndex, maxIndex) { 
    if (minIndex > maxIndex) {
        logger._print('没有找到：' + element );
        return -1;
    }

    var middleIndex = Math.floor((minIndex + maxIndex) / 2);
    var testElement = array[middleIndex];

    tracer._select(minIndex, maxIndex)._wait();
    tracer._notify(middleIndex);
    logger._print('在位置 ' + middleIndex + ' 判断')._wait();
    tracer._denotify(middleIndex);
    tracer._deselect(minIndex, maxIndex);

    if (testElement < element) {
        logger._print('向右查找.');
        return BinarySearch(array, element, middleIndex + 1, maxIndex);
    }

    if (testElement > element) {
        logger._print('向左查找.');
        return BinarySearch(array, element, minIndex, middleIndex - 1);
    }

    if (testElement === element) {
        logger._print('在位置 ' + middleIndex + ' 找到 ' + element  + '!');
        tracer._select(middleIndex);
        return middleIndex;
    }

    logger._print('没有找到：' + element );
    return -1;
}

var element = D[Integer.random(0, D.length - 1)];

BinarySearch(D, element, 0, D.length - 1);