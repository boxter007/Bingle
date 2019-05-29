function BinarySearch(array, element, minIndex, maxIndex) { 
    if (minIndex > maxIndex) {
        return -1;
    }
    var middleIndex = Math.floor((minIndex + maxIndex) / 2);
    var testElement = array[middleIndex];
    if (testElement < element) {
        return BinarySearch(array, element, middleIndex + 1, maxIndex);
    }

    if (testElement > element) {
        return BinarySearch(array, element, minIndex, middleIndex - 1);
    }

    if (testElement === element) {
        return middleIndex;
    }
    return -1;
}
var element = D[Integer.random(0, D.length - 1)];
BinarySearch(D, element, 0, D.length - 1);