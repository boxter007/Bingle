for (let i = 0; i < array.length; i++) {
	var bucketPos = Math.floor(numBuckets * (array[i] / maxValue));
	buckets[bucketPos].push(array[i]);
	bucketsCount[bucketPos]++;
}
var sortLocation = 0;
for (let k = 0; k < buckets.length; k++) {
	for (let i = 1; i < buckets[k].length; i++) {
		var key = buckets[k][i];
		var j;
		for (j = i - 1; (j >= 0) && (buckets[k][j] > key); j--) {
			buckets[k][j + 1] = buckets[k][j];
		}
		buckets[k][j + 1] = key;
	}
	for (let i = 0; i < buckets[k].length; i++) {
		sortedArray[sortLocation] = buckets[k][i];
		bucketsCount[k]--;
		sortLocation++;
	}
}