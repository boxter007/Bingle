function isMajorityElement ( element ) {
	var count = 0;
	for (var i = N - 1; i >= 0; i--) {
		tracer._notify (i,A[i])._wait ();
		if (A[i] == element) {
			count++;
		} else {
			tracer._denotify (i);
		}
	}
	if(count>Math.floor (N/2)) {
		return true;
	}
	return false;
}

function findProbableElement () {
	var index = 0, count = 1;
	for( var i = 1; i < N; i++ ) {
		tracer._notify (i,A[i])._wait ();
		if(A[index]==A[i]) {
			count++;
		} else {
			count--;
		}

		if(count===0) {
			index = i;
			count = 1;
		} 
	}
	return A[index];
}
function findMajorityElement () {
	var element = findProbableElement ();
	isMajorityElement (element) ；
}
findMajorityElement ();