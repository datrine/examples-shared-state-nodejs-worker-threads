const LOCKED   = 1;
const UNLOCKED = 0;

function acquireLock(lockView, index) {
  while (true) {
    // Try to go from UNLOCKED → LOCKED atomically
    const old = Atomics.compareExchange(
      lockView, index, UNLOCKED, LOCKED
    );

    if (old === UNLOCKED) return; // we got it

    // Lock is held — sleep until notified
    Atomics.wait(lockView, index, LOCKED);
  }
}

function releaseLock(lockView, index) {
  Atomics.store(lockView, index, UNLOCKED);
  // Wake one waiting thread (this random)
  Atomics.notify(lockView, index, 1);
}

module.exports = { acquireLock, releaseLock };