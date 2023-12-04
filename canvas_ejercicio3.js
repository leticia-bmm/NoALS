const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var memoryX;
var memoryY;
var x;
var y;

function drawPuntillitas(){
    //ctx.strokeRect(100, 100, 150, 400);
    ctx.beginPath();
    // dibujo los pintillitos del canvas
    // no hace nada, solo dibuja
    ctx.setLineDash([15, 15]);
    //localizarlo en la pantalla del canvas(x e y)
    //donde empieza? 
    ctx.moveTo(50, 50);
    // hasta donde llega la línea
    ctx.lineTo(200, 250);
    ctx.stroke();
    // primera parte

    // arco de los coj
    ctx.beginPath();
    ctx.setLineDash([15, 15]);
    ctx.arc(300, 250, 100, 1 * Math.PI, 2 * Math.PI);
    ctx.stroke();

    // otra line para arriba
    ctx.beginPath();
    ctx.setLineDash([15, 15]);
    ctx.moveTo(400, 250);
    ctx.lineTo(550, 50);
    ctx.stroke();
}


var isPressed = false;

drawPuntillitas();

canvas.addEventListener("mousedown", function(e){
    ctx.beginPath();
    x = e.clientX - canvas.getBoundingClientRect().left;
    y = e.clientY - canvas.getBoundingClientRect().top
    ctx.moveTo(x, y);
    isPressed = true;
})

canvas.addEventListener("mousemove", function(e){
    if (isPressed){
        console.log(e);
        console.log("Click en ", e.offsetX, e.offsetY);
        ctx.setLineDash([]);
        ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        ctx.stroke();
        //ctx.fillRect(e.offsetX, e.offsetY, 3, 3);
    }
})

canvas.addEventListener("mouseup", function(e){
    isPressed = false;
    ctx.closePath();
})

// button calls downloadCamvas
let download = document.getElementById('download');
download.addEventListener('click', downloadCanvas);

// button calls clearCanvas
let clear = document.getElementById('clear');
clear.addEventListener('click', clearCanvas);

// function to clear the canvas called by a button 'clear'
function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPuntillitas();
}

// function to download canvas alled by button 'download'
function downloadCanvas() {
    let filename = "canvas.png"
    // create an "off-screen" anchor tag
    var lnk = document.createElement('a'), e;

    // the key here is to set the download attribute of the a tag
    lnk.download = filename;

    // convert canvas content to data-uri for link. When download
    // attribute is set the content pointed to by link will be
    // pushed as "download" in HTML5 capable browsers
    lnk.href = canvas.toDataURL("image/png;base64");

    // create a "fake" click-event to trigger the download
    if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);
    lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
    }
}
