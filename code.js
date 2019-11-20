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

        context.lineTo(point.x, point.y);
        context.stroke()
    })
});

['touchend', 'touchleave', 'mouseup'].forEach(function (ev) {
    canvas.addEventListener(ev, function (e) {
        isMousedown = false
    })
});

