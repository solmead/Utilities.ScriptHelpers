declare module Tasks {
    interface IException {
        message: string;
    }
    class Task<TT> {
        private func;
        promise: Promise<TT>;
        private resolveFunc;
        constructor(func: (cback?: (val?: TT) => void) => void);
        then: (onFulfilled: (value?: TT) => TT | PromiseLike<TT>) => Promise<TT>;
        start: () => void;
    }
    interface IDebouncedTask<TT> extends Task<TT> {
        trigger: () => void;
        call: () => void;
    }
    class RecurringTask {
        private callback;
        private timeout;
        private maxLockTime?;
        private _isRunning;
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
