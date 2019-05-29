function BinarySearch(array, element) { 
    var minIndex = 0;
    var maxIndex = array.length - 1;
    var testElement;
    while (minIndex <= maxIndex) {
        var middleIndex = Math.floor((minIndex + maxIndex) / 2);
        testElement = array[middleIndex];
        if (testElement < element) {
            minIndex = middleIndex + 1;
        } else if (testElement > element) {
            maxIndex = middleIndex - 1;
        } else {
            return middleIndex;
        }
    }
    return -1;
}
var element = D[Integer.random(0, D.length - 1)];
BinarySearch(D, element);