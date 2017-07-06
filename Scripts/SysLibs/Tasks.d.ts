declare module Tasks {
    interface IException {
        message: string;
    }
    class Task<TT> extends Promise<TT> {
        private func;
        private resolveFunc;
        constructor(func: (cback?: (val?: TT) => void) => void);
        start: () => void;
    }
    interface IDebouncedTask<TT> extends Task<TT> {
        trigger: () => void;
        call: () => void;
    }
    class RecurringTask {
        private callback;
        private timeout;
        private maxLockTime;
        _isRunning: boolean;
        private locker;
        private timedCall;
        constructor(callback: () => void, timeout: number, maxLockTime?: number);
        readonly isRunning: boolean;
        setTimeOut: (time: number) => void;
        lock: () => void;
        unLock: () => void;
        isLocked: () => boolean;
        start: () => void;
        stop: () => void;
    }
    function runAfterWait(waitTimeMilliSeconds: number): IDebouncedTask<void>;
    function debounced(): IDebouncedTask<void>;
    function delay(msec: number): Promise<void>;
    function whenReady(): Promise<void>;
    function whenTrue(trueFunc: () => boolean): Promise<void>;
}
