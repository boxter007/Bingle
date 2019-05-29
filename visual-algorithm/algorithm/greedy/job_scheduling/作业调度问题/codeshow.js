for (var i = 0; i < N - 1; i++) {
    for (var j = 0; j < N - i - 1; j++) {
        if (profit[j] < profit[j + 1]) {
            var temp = profit[j];
            profit[j] = profit[j + 1];
            profit[j + 1] = temp;
            temp = deadline[j];
            deadline[j] = deadline[j + 1];
            deadline[j + 1] = temp;
            var t = jobId[j];
            jobId[j] = jobId[j + 1];
            jobId[j + 1] = t;
        }
    }
}
var slot = new Array(N);
var result = new Array(N);
for (var i = N - 1; i >= 0; i--) {
    result[i] = '-';
}
for (var i = 0; i < N; i++) {
    slot[i] = 0;
}
for (var i = 0; i < N; i++) {
    for (var j = Math.min(N, deadline[i]) - 1; j >= 0; j--) {
        if (slot[j] === 0) {
            result[j] = jobId[i];
            slot[j] = 1;
            break;
        }
    }
}

