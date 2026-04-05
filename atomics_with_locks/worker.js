const { workerData } = require('worker_threads');
const { acquireLock, releaseLock } = require('./lock_utils');
const worker_id=workerData.id
const view = new Int32Array(workerData.sab);
const LOCK_IDX    = 0;
const COUNTER_IDX = 1;
for(let i = 0; i < 1000; i++){
  acquireLock(view, LOCK_IDX);
  view[COUNTER_IDX] += 1; // writes to shared memory
  console.log(`worker id: ${worker_id} view[COUNTER_IDX]: ${view[COUNTER_IDX]}`);
  releaseLock(view, LOCK_IDX);
}

