var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var isMousedown = false;
['touchstart', 'mousedown'].forEach(function (ev) {
    canvas.addEventListener(ev, function (e) {
        isMousedown = true
    });
});

var points = [];
['touchmove', 'mousemove'].forEach(function (ev) {
    canvas.addEventListener(ev, function (e) {
        if (!isMousedown) return

        var point = {
            x: e.pageX,
            y: e.pageY
        }
        points.push(point);
    })
});

['touchend', 'touchleave', 'mouseup'].forEach(function (ev) {
    canvas.addEventListener(ev, function (e) {
        isMousedown = false
        drawPathAnimation(points, context);
    })
});


function drawLine(context, startPoint, endPoint) {
    // draws a straight line between two points
    context.beginPath()
    context.moveTo(endPoint.x, endPoint.y);
    context.lineTo(startPoint.x, startPoint.y);
    context.stroke()
}

function drawPath(points, context) {
    // iterates through an array of points and draws the complete path
    for(var i = 1; i <= points.length; i++) {
        var startPoint = points[i];
        var endPoint = points[i - 1];
        drawLine(context, startPoint, endPoint)
    }
}


function drawPathAnimation(points, context, animationInterval) {
    // iterates through an array of points and draws an animation of the complete path
    let i = 1;
    let drawInterval = setInterval(() => {
        if(i >= points.length) {
            clearInterval(drawInterval)
            return;
        }

        var startPoint = points[i];
        var endPoint = points[i - 1];
        drawLine(context, startPoint, endPoint)

        i++;
    }, animationInterval || 30);
}

