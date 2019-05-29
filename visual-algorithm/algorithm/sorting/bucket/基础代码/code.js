for (let i = 0; i < array.length; i++) {
	tracer._wait(0);
	tracer._wait(1);
	var bucketPos = Math.floor(numBuckets * (array[i] / maxValue));
	tracer._wait(2);
	buckets[bucketPos].push(array[i]);
	tracer._wait(3);
	bucketsCount[bucketPos]++;
	tracer._select(0, i)._wait();
	tracer._notify(1, bucketPos, D[1][bucketPos])._wait();
	tracer._deselect(0, i);
	tracer._denotify(1, bucketPos, D[1][bucketPos]);
}
tracer._wait(5);
var sortLocation = 0;
for (let k = 0; k < buckets.length; k++) {
	tracer._wait(6);
	//do insertion sort
	for (let i = 1; i < buckets[k].length; i++) {
		tracer._wait(7);
		tracer._wait(8);
		var key = buckets[k][i];
		tracer._wait(9);
		var j;
		for (j = i - 1; (j >= 0) && (buckets[k][j] > key); j--) {
			tracer._wait(10);
			tracer._wait(11);
			buckets[k][j + 1] = buckets[k][j];
		}
		buckets[k][j + 1] = key;
	}
	
	//place ordered buckets into sorted array
	for (let i = 0; i < buckets[k].length; i++) {
		tracer._wait(15);
		tracer._wait(16);
		sortedArray[sortLocation] = buckets[k][i];
		tracer._wait(17);
		bucketsCount[k]--;
		tracer._notify(1, k, D[1][k]);
        tracer._notify(2, sortLocation, D[2][sortLocation])._wait();
		tracer._denotify(1, k, D[1][k]);
        tracer._denotify(2, sortLocation, D[2][sortLocation]);
        tracer._wait(18);
		sortLocation++;
	}
}