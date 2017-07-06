interface Date {
    addDays(days: number): Date;
}
declare module DateTime {
    class ServerTime {
        private timeApiUrl;
        serverStartTime: Date;
        startTime: Date;
        serverDateTime: Date;
        offset: number;
        serverTimeLoaded: boolean;
        constructor(timeApiUrl: string);
        init: () => Promise<void>;
        now: () => Date;
        refreshServerTime: () => Promise<void>;
    }
    var serverTime: ServerTime;
    function dateFromIso8601(isostr: string): Date;
    function formatTimeSpan(ts: number): string;
    function formatDate(dt: Date): string;
    function formatTime(dt: Date, hideMs?: boolean): string;
    function getTimeCount(): number;
}
