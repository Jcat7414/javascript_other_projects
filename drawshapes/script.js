function draw() {
    var canvas = document.getElementById('circle');

    if (canvas.getContext) {
        // Draw a circle
        var ctx = canvas.getContext('2d');
        var X = canvas.width / 2;
        var Y = canvas.height / 2;
        var R = 45;
        ctx.beginPath();
        ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#FF0000';
        ctx.stroke();
    }

    // Draw a square or rectangle
    var canvas = document.getElementById('canvas');

    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        
        context.fillRect(20,20,100,100);
        context.clearRect(40,40,60,60);
        context.strokeRect(45,45,50,50);
    }

    // Draw overlaping transparent rectangles, one which has transparency
    var canvas = document.getElementById('intersectsquare');

    if (canvas.getContext) {
        var context = canvas.getContext('2d');

        context.fillStyle = "rgb(256,0,0)";
        context.fillRect (15, 10, 75, 70);

        context.fillStyle = "rgba(0, 0, 200, 0.6)";
        context.fillRect (55, 50, 75, 70);
    }

    // Draw a right angle triangle
    var canvas = document.getElementById('triangle');

    if (canvas.getContext) {
        var context = canvas.getContext('2d');

        context.beginPath();
        context.moveTo(75,75);
        context.lineTo(10,75);
        context.lineTo(10,5);
        context.fill();
    }

    // Draw smiley face
    var canvas = document.getElementById('smileyface');

    if (canvas.getContext) {
        var context = canvas.getContext('2d');

        context.beginPath();
        // Outer circle
        context.arc(75,75,50,0,Math.PI*2,true);
        context.moveTo(110,75);
        // Mouth
        context.arc(75,75,35,0,Math.PI,false);
        //Left and Right eye
        context.moveTo(65,65);
        context.arc(60,65,5,0,Math.PI*2,true);
        context.moveTo(95,65);
        context.arc(90,65,5,0,Math.PI*2,true);

        context.stroke();
    }

    //  Draw circles on angle, descending to right
    var ctx = document.getElementById('circles').getContext('2d');
    var counter = 0;
    for (var i=0;i<6;i++) {
        for (var j=0;j<6;j++){
            // Start from white and goes to black
            ctx.fillStyle = "rgb(" + Math.floor(255-42.5*i) + "," + Math.floor(255-42.5*i) + "," + Math.floor(255-42.5*j) + ")";
            ctx.beginPath();
            if (i === counter && j === counter) {
                // Create circles
                ctx.arc(25+j*50,30+i*50,20,0,Math.PI*2,true);
                ctx.fill();
                // creates a border around the circles so white one will be visible
                ctx.stroke();
            }
        }
        counter++;
    }
}


