export var Primitives;
(function (Primitives) {
    function fillArc(context, pos, radius, startangle, endangle, color) {
        context.beginPath();
        context.fillStyle = color;
        context.arc(pos.x, pos.y, radius, startangle, endangle, false);
        context.closePath();
        context.fill();
    }
    Primitives.fillArc = fillArc;
    ;
    function fillCircle(context, pos, radius, color) {
        fillArc(context, pos, radius, 0, 2 * Math.PI, color);
    }
    Primitives.fillCircle = fillCircle;
    ;
    function fillPoly(context, refPnt, points, color) {
        context.fillStyle = color;
        context.beginPath();
        context.moveTo((refPnt.x + points[0].x), (refPnt.y + points[0].y));
        for (var j = 1; j < points.length; j++) {
            context.lineTo((points[j].x + refPnt.x), (points[j].y + refPnt.y));
        }
        context.lineTo((refPnt.x + points[0].x), (refPnt.y + points[0].y));
        context.closePath();
        context.fill();
    }
    Primitives.fillPoly = fillPoly;
    ;
    function fillRect(context, rect, color) {
        context.beginPath();
        context.fillStyle = color;
        context.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
        context.closePath();
        context.fill();
    }
    Primitives.fillRect = fillRect;
    ;
    function fillPoint(context, pos, color) {
        context.beginPath();
        context.fillStyle = color;
        context.fillRect(pos.x, pos.y, 1, 1);
        context.closePath();
        context.fill();
    }
    Primitives.fillPoint = fillPoint;
    ;
    function drawArc(context, pos, radius, startangle, endangle, color, lineWidth) {
        if (lineWidth == null) {
            lineWidth = 1;
        }
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        context.arc(pos.x, pos.y, radius, startangle, endangle, false);
        context.closePath();
        context.stroke();
    }
    Primitives.drawArc = drawArc;
    ;
    function drawCircle(context, pos, radius, color, lineWidth) {
        drawArc(context, pos, radius, 0, 2 * Math.PI, color, lineWidth);
    }
    Primitives.drawCircle = drawCircle;
    ;
    function drawPoly(context, refPnt, points, color, lineWidth) {
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
    }
    Primitives.drawPoly = drawPoly;
    ;
    function drawRect(context, rect, color, lineWidth) {
        if (lineWidth == null) {
            lineWidth = 1;
        }
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        context.strokeRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
        context.closePath();
        context.stroke();
    }
    Primitives.drawRect = drawRect;
    ;
    function drawPoint(context, pos, color) {
        context.beginPath();
        context.strokeStyle = color;
        context.strokeRect(pos.x, pos.y, 1, 1);
        context.closePath();
        context.stroke();
    }
    Primitives.drawPoint = drawPoint;
    ;
})(Primitives || (Primitives = {}));
//# sourceMappingURL=Primitives.js.map