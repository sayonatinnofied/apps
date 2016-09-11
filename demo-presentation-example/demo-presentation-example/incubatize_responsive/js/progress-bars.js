$(document).ready(function() {
    var progress = new Array(3);
    for (i = 0; i < 3; i++) {
        progress[i] = new CircularProgress({
            radius: 19,
            strokeStyle: '#606060',
            lineCap: 'square',
            lineJoin: 'round',
            lineWidth: 5,
            shadowBlur: 0,
            shadowColor: 'yellow',
            text: {
                font: "500 14px 'CorbertRegular'",
                shadowBlur: 0
            },
            initial: {
                strokeStyle: 'white',
                lineCap: 'square',
                lineJoin: 'round',
                lineWidth: 3,
                shadowBlur: 4,
                shadowColor: 'black'
            }
        });
    }

    document.getElementsByClassName('active-impact-box')[0].appendChild(progress[0].el);
    progress[0].update(50);

    document.getElementsByClassName('active-practicality-box')[0].appendChild(progress[1].el);
    progress[1].update(80);

    document.getElementsByClassName('active-alignment-box')[0].appendChild(progress[2].el);
    progress[2].update(40);

});
