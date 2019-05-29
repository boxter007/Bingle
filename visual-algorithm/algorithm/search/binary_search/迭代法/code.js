function BinarySearch(array, element) { // array = sorted array, element = element to be found
    logger._wait(1);
    var minIndex = 0;
    logger._wait(2);
    var maxIndex = array.length - 1;
    logger._wait(3);
    var testElement;

    while (minIndex <= maxIndex) {
        logger._wait(4);
        logger._wait(5);
        var middleIndex = Math.floor((minIndex + maxIndex) / 2);
        logger._wait(6);
        testElement = array[middleIndex];

        tracer._select(minIndex, maxIndex)._wait();
        tracer._notify(middleIndex);
        logger._print('在位置 ' + middleIndex + ' 判断')._wait();
        tracer._denotify(middleIndex);
        tracer._deselect(minIndex, maxIndex);
        logger._wait(7);
        if (testElement < element) {

            logger._print('向右查找.');
            logger._wait(8);
            minIndex = middleIndex + 1;

        } else if (testElement > element) {
            logger._wait(9);
            logger._print('向左查找.');
            logger._wait(10);
            maxIndex = middleIndex - 1;

        } else {

            logger._print('在位置 ' + middleIndex + ' 找到 ' + element +'!');
            tracer._select(middleIndex);
            logger._wait(12);
            return middleIndex;
        }
    }

    logger._print('没有找到 ' + element);
    logger._wait(15);
    return -1;
}
logger._wait(17);
var element = D[Integer.random(0, D.length - 1)];
logger._wait(18);
BinarySearch(D, element);
