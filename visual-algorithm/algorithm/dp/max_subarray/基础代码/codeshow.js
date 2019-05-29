var maxSubarraySum = (function maxSubarray(array) {
    var maxSoFar = 0, maxEndingHere = 0;
    for (var i = 0; i < array.length; i++) {
        maxEndingHere += array[i];
        if (maxEndingHere < 0) {
            maxEndingHere = 0;
        }
        if (maxSoFar < maxEndingHere) {
            maxSoFar = maxEndingHere;
        }
    }
    return maxSoFar;
})(D);