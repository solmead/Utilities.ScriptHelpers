declare module Lock {
    class Locker {
        maxLockTime: number;
        private locked;
        private lastCalled;
        constructor(maxLockTime?: number);
        isLocked: () => boolean;
        lock: () => void;
        unLock: () => void;
    }
}
