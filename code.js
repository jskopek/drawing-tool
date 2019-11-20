// FUNCTIONS
function getCursorCoords(e) {
    // takes a touch event and returns a dictionary of {x, y} values
    var touchEvt = (e.touches && e.touches[0]) ? e.touches[0] : e;
    return {
        x: parseInt(touchEvt.pageX),
        y: parseInt(touchEvt.pageY)
    }
}

function monitorDrawEvents(canvas, userCallbacks) {
    // monitors any draw events on the canvas
    // a draw event is when a cursor is moved while the mouse is pressed
    // optional callbacks:
    //  - onUpdate(startPoint, endPoint): returns a starting and ending point dict, which contain x & y values, when a pressed cursor is moved
    //  - onComplete(points): returns an array of points that make up a complete path when the cursor is released
    let callbacks = Object.assign({
        onUpdate: (startPoint, endPoint) => {},
        onComplete: (points) => {}
    }, userCallbacks);

    var isMousedown = false;
    var points = [];
    var point;


    ['touchstart', 'mousedown'].forEach((eventName) => {
        canvas.addEventListener(eventName, function (e) {
            isMousedown = true
        })
    });

    ['touchmove', 'mousemove'].forEach((eventName) => {
        canvas.addEventListener(eventName, function (e) {
            if (!isMousedown) return

            e.preventDefault()

            var newPoint = getCursorCoords(e)
            points.push(newPoint)

            callbacks.onUpdate(point, newPoint)

            point = newPoint
        })
    });

    ['touchend', 'touchleave', 'mouseup'].forEach((eventName) => {
        canvas.addEventListener(eventName, function (e) {
            isMousedown = false

            callbacks.onComplete(points)

            points = []
            point = undefined;
        })
    });
}


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
// /FUNCTIONS


// APPLICATION CODE
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

monitorDrawEvents(canvas, {
    onComplete: (points) => {
        drawPathAnimation(points, context);
    }
});
