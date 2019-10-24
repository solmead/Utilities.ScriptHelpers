import { geometry } from "./geometry";




export module Primitives {


    export function fillArc(context: CanvasRenderingContext2D, pos: geometry.Point, radius: number, startangle: number, endangle: number, color: string) {
        context.beginPath();
        context.fillStyle = color;
        context.arc(pos.x, pos.y, radius, startangle, endangle, false);
        context.closePath();
        context.fill();
    };
    export function fillCircle(context: CanvasRenderingContext2D, pos: geometry.Point, radius: number, color: string) {
        fillArc(context, pos, radius, 0, 2 * Math.PI, color);
    };

    export function fillPoly(context: CanvasRenderingContext2D, refPnt: geometry.Point, points: Array<geometry.Point>, color: string) {
        context.fillStyle = color;
        context.beginPath();
        context.moveTo((refPnt.x + points[0].x), (refPnt.y + points[0].y));
        for (var j = 1; j < points.length; j++) {
            context.lineTo((points[j].x + refPnt.x), (points[j].y + refPnt.y));
        }
        context.lineTo((refPnt.x + points[0].x), (refPnt.y + points[0].y));
        context.closePath();
        context.fill();
    };
    export function fillRect(context: CanvasRenderingContext2D, rect:geometry.Rect, color: string) {
        context.beginPath();
        context.fillStyle = color;
        context.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
        context.closePath();
        context.fill();
    };
    export function fillPoint(context: CanvasRenderingContext2D, pos: geometry.Point, color: string) {
        context.beginPath();
        context.fillStyle = color;
        context.fillRect(pos.x, pos.y, 1, 1);
        context.closePath();
        context.fill();
    };
    export function drawArc(context: CanvasRenderingContext2D, pos: geometry.Point, radius: number, startangle: number, endangle: number, color: string, lineWidth: number) {
        if (lineWidth == null) {
            lineWidth = 1;
        }
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        context.arc(pos.x, pos.y, radius, startangle, endangle, false);
        context.closePath();
        context.stroke();
    };
    export function drawCircle(context: CanvasRenderingContext2D, pos: geometry.Point, radius: number, color: string, lineWidth: number) {
        drawArc(context, pos, radius, 0, 2 * Math.PI, color, lineWidth);
    };
    export function drawPoly(context: CanvasRenderingContext2D, refPnt: geometry.Point, points: Array<geometry.Point>, color: string, lineWidth: number) {
        if (points.length == 0) {
            return;
        }
        if (lineWidth == null) {
            lineWidth = 1;
        }
        context.strokeStyle = color;
        context.beginPath();
        context.lineWidth = lineWidth;
        context.moveTo((refPnt.x + points[0].x), (refPnt.y + points[0].y));
        for (var j = 1; j < points.length; j++) {
            context.lineTo((points[j].x + refPnt.x), (points[j].y + refPnt.y));
        }
        context.lineTo((refPnt.x + points[0].x), (refPnt.y + points[0].y));
        context.closePath();
        context.stroke();
    };
    export function drawRect(context: CanvasRenderingContext2D, rect:geometry.Rect, color: string, lineWidth: number) {
        if (lineWidth == null) {
            lineWidth = 1;
        }
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        context.strokeRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
        context.closePath();
        context.stroke();
    };
    export function drawPoint(context: CanvasRenderingContext2D, pos: geometry.Point, color:string) {
        context.beginPath();
        context.strokeStyle = color;
        context.strokeRect(pos.x, pos.y, 1, 1);
        context.closePath();
        context.stroke();
    };


}