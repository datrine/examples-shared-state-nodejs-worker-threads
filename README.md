# Shared State in Node.js Worker Threads

Demonstrates three approaches to sharing state between worker threads using `SharedArrayBuffer`:

## Approaches

### 1. Naive (`naive/`)
Uses regular `+=` operations. **Has race conditions** - updates will be lost due to non-atomic read-modify-write.

### 2. Atomics (`atomics/`)
Uses `Atomics.add()` for atomic increments. Thread-safe for individual operations, but operations can still interleave.

### 3. Atomics with Locks (`atomics_with_locks/`)
Implements a mutex using `Atomics.compareExchange`, `Atomics.wait`, and `Atomics.notify`. Provides proper mutual exclusion.

## Running

```bash
node naive/main.js
node atomics/main.js
node atomics_with_locks/main.js
```

Each spawns 5 workers that increment a shared counter 1000 times. The final counter should be:
- Naive: < 5000 (lost updates)
- Atomics: 5000 (atomic but may interleave)
- Atomics with Locks: 5000 (properly synchronized)
