declare module Tasks {
    enum TaskStatus {
        Created = 0,
        Canceled = 1,
        Faulted = 2,
        RanToCompletion = 3,
        Running = 4,
        WaitingForActivation = 5,
        WaitingForChildrenToComplete = 6,
        WaitingToRun = 7,
    }
    interface IException {
        message: string;
    }
    interface IDebouncedTask extends Task {
        trigger: () => void;
        call: () => void;
    }
    class Task {
        private func;
        private _isFinished;
        private _isCancelled;
        private _isFaulted;
        private _status;
        private _exception;
        private _result;
        private ev;
        private callback;
        constructor(func?: (isFinished?: (result?: any) => void) => void);
        readonly result: any;
        readonly isFinished: boolean;
        readonly isCancelled: boolean;
        readonly isFaulted: boolean;
        readonly status: TaskStatus;
        readonly exception: IException;
        runToEnd: () => void;
        start: () => Task;
        then: (call: Task | ((isFinished: (result?: any) => void) => void)) => Task;
        continueWith: (call: (isFinished: (result?: any) => void) => void) => Task;
        wait: (secondsWait?: number) => Task;
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
    function runAfterWait(waitTimeMilliSeconds: number): IDebouncedTask;
    function debounced(): IDebouncedTask;
    function debouncedAtEnd(waitTimeMilliSeconds: number): IDebouncedTask;
    function run(task: Task | ((isFinished: (result?: any) => void) => void)): Task;
    function delay(msec: number): Task;
    function whenReady(): Task;
    function whenTrue(trueFunc: () => boolean): Task;
    function waitAll(tasks: Array<Task>, timeOut?: number): Task;
    function waitAny(tasks: Array<Task>, timeOut?: number): Task;
    function whenAll(tasks: Array<Task>): Task;
    function whenAny(tasks: Array<Task>): Task;
    function whenAllSync(tasks: Array<Task>): Task;
}
