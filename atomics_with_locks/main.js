const { Worker } = require("worker_threads");
const NUM_WORKERS = 5;
const workers = new Map();
const sab = new SharedArrayBuffer(8);
const view = new Int32Array(sab);
view[0] = 0; // initial lock
view[1] = 0; // initial counter
for (let i = 1; i <= NUM_WORKERS; i++) {
  const w = new Worker("./worker.js", {
    workerData: { id: `worker_${i}`, sab },
  });
  w.unref(); // allow the main thread to exit if this is the only active worker
  w.on("exit", () => {
    console.log(`worker ${workerId} exited`);
    workers.delete(workerId);
  });
  const workerId = w.threadId;
  workers.set(workerId, w);
}

console.log("main thread waiting for workers to finish...");
// Wait for all workers to finish:
  return new Promise((resolve) => {
    function check() {
      if (workers.size === 0) return resolve();
      setTimeout(check, 10); // yield to event loop
    }
    check();
  }).then(() => {
    console.log("main thread counter:", view[1]);
    console.log("main thread exiting...");
  });
