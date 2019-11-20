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

['touchmove', 'mousemove'].forEach(function (ev) {
    canvas.addEventListener(ev, function (e) {
        if (!isMousedown) return

        context.lineTo(e.pageX, e.pageY);
        context.stroke()
    })
});

['touchend', 'touchleave', 'mouseup'].forEach(function (ev) {
    canvas.addEventListener(ev, function (e) {
        isMousedown = false
    })
});

