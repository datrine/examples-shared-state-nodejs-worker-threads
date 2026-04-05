const { workerData } = require("worker_threads");
const worker_id = workerData.id;
const view = new Int32Array(workerData.sab);
for (let i = 0; i < 1000; i++) {
  view[0] += 1; // writes to shared memory
  console.log(`worker id: ${worker_id} view[0]: ${view[0]}`);
}
