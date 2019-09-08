var canvas = document.querySelector('canvas');
var ctx = canvas.getContext("2d");




var img = new Image();
img.crossOrigin = "anonymous";
img.onload = start;
img.src = "https://i.imgur.com/LDRTLpJ.png";
canvas.width = 473;
canvas.height= 354;

function start() {
    //ctx.drawImage(img, 150, 0);
    animate()


}

function outLine(){
    console.log((ctx.getImageData(0,0,canvas.width,canvas.height)));
    //console.log((ctx.getImageData(0,0,canvas.width,canvas.height)).data);
    var i;
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;

    let red;
    let green;
    let blue;
    let alpha;


}
function recolor(col) {
//right top: 316,344, right Bot: 309,353 left Top 159,344 166,353
    var i;
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    var data = imgData.data;

    let red;
    let green;
    let blue;
    let alpha;
    for (i = 0; i < data.length; i += 4) {
        red = data[i];
        green = data[i + 1];
        blue = data[i + 2];
        alpha = data[i + 3];

        // skip transparent/semiTransparent pixels
        if (alpha < 200) {
            continue;
        }

        var hsl = rgbToHsl(red, green, blue);
        var hue = hsl.h * 360;
       // var light=hsl.l*360;

        // change pixels to the new color
        if (hue > 10 && hue < 80) {
            var newRgb = hslToRgb(hsl.h + col, hsl.s, hsl.l);
            data[i] = newRgb.r;
            data[i + 1] = newRgb.g;
            data[i + 2] = newRgb.b;
            data[i + 3] = 255;
        }

    }
    ctx.putImageData(imgData, 0, 0);
}
var amount=1000;

function Circle(x,y,dx,dy){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dx;
    this.draw=function(){
        if(getRandomInt(0,10)<1) {
            ctx.fillStyle = 'hsl(360,100%,100%)';
            amount++;
        }
        else
            ctx.fillStyle='hsl(183 ,100%,'+getRandomInt(25,50)+'%)';
        ctx.beginPath();
        ctx.arc(this.x,this.y,1,0,Math.PI *2,false);
        ctx.closePath();
        ctx.fill();
    }
    this.update=function() {
        if (this.x > 315 || this.x < 161)
            this.dx = -this.dx;
        if (this.y > 354 || this.y < 343)
            this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
    this.updateTwo=function(){
        if (this.x > 459 || this.x < 13)
            this.dx = -this.dx;
        if (this.y > 18 || this.y < 13)
            this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function getRandomInt(min,max){
    min=Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random()*(max-min+1))+min;
}

var circleTop=[];
var circleArray=[];
for(var i=0;i<amount;i++) {
    var x = getRandomInt(166, 309);
    var y = getRandomInt(344, 353);
    var dx = (Math.random() - .5) * 2;
    var dy = (Math.random() - .5) * 2;
    circleArray.push(new Circle(x, y, dx, dy));
    for(var j = 0; j<3;j++) {
        var x = getRandomInt(12, 460);
        var y = getRandomInt(12, 19);
        var dx = (Math.random() - .5) * 3;
        var dy = (Math.random() - .5) * 2;
        circleTop.push(new Circle(x, y, dx, dy));
    }
}
console.log(circleTop.length);
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,473,354);
    ctx.drawImage(img, 0, 0);
    recolor(.43);
    for(var i=0;i<circleArray.length;i++){
        circleTop[i].updateTwo();
        circleArray[i].update();
        circleTop[i+1].updateTwo();
        circleTop[i+2].updateTwo();
    }


}

function rgbToHsl(r, g, b) {
    b /= 255, r /= 255, g /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return ({
        h: h,
        s: s,
        l: l
    });
}


function hslToRgb(h, s, l) {
    var r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return ({
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    });
}