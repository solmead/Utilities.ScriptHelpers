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
        now: () => Date;
        refreshServerTime: () => void;
    }
    var serverTime: ServerTime;
    function dateFromIso8601(isostr: string): Date;
    function formatTimeSpan(ts: number): string;
    function formatDate(dt: Date): string;
    function formatTime(dt: Date, hideMs?: boolean): string;
    function getTimeCount(): number;
}
