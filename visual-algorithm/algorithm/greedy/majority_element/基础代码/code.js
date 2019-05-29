function isMajorityElement ( element ) {
	var count = 0;
	logger._print ('验证多数票  ' + element );
	for (var i = N - 1; i >= 0; i--) {
		tracer._notify (i,A[i])._wait ();
		if (A[i] == element) {
			count++;
		} else {
			tracer._denotify (i);
		}
	}
	logger._print ('假定多数票数量： ' + count);
	if(count>Math.floor (N/2)) {
		logger._print ('假设正确!');
		return true;
	}
	logger._print ('假设错误!');
	return false;
}

function findProbableElement () {
	var index = 0, count = 1;
	tracer._select (index)._wait();
	logger._print ('开始假设多数票元素 : ' + A[index] + ' 计数 : ' +count);
	logger._print ('--------------------------------------------------------');
	for( var i = 1; i < N; i++ ) {
		tracer._notify (i,A[i])._wait ();
		if(A[index]==A[i]) {
			count++;
			logger._print ('与假设多数票相同! 计数 : ' + count);
		} else {
			count--;
			logger._print ('与假设多数票不同! 计数 : ' + count);
		}

		if(count===0) {
			logger._print ('错误的假设');
			tracer._deselect (index);
			tracer._denotify (i);
			index = i;
			count = 1;
			tracer._select (i)._wait ();
			logger._print ('新假设多数票!'+ A[i]  +' 计数 : '+count);
			logger._print ('--------------------------------------------------------');
		} else {
			tracer._denotify (i);		
		}
	}
	logger._print ('最终假设多数票 ' + A[index]);
	logger._print ('--------------------------------------------------------');
	return A[index];
}

function findMajorityElement () {
	var element = findProbableElement ();
	if(isMajorityElement (element) === true) {
		logger._print ('多数票元素 ' + element);
	} else {
		logger._print ('没有多数票元素');
	}
}

findMajorityElement ();