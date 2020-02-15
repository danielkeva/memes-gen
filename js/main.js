'use strict';

var gCanvas;
var gCtx;
var isDragging;
var isDownloading;

function onInit() {
    isDragging = false;
    isDownloading = false;
    document.querySelector('.meme-container').style.display = 'none';
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')

    gCanvas.addEventListener("touchstart", touchHandler, true);
    gCanvas.addEventListener("touchmove", touchHandler, true);
    gCanvas.addEventListener("touchend", touchHandler, true);
    gCanvas.addEventListener("touchcancel", touchHandler, true);

    function touchHandler(ev) {
        ev.preventDefault();
        let touch = ev.changedTouches[0];
        let simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
            touchstart: "mousedown",
            touchmove: "mousemove",
            touchend: "mouseup"
        }[ev.type], true, true, window, 1,
            touch.screenX, touch.screenY,
            touch.clientX, touch.clientY, false,
            false, false, false, 0, null);
    
        touch.target.dispatchEvent(simulatedEvent);
    }
    


    renderGallery()
    renderCanvas()

}



function renderCanvas() {
    var lines = getLines()
    var img = new Image()
    img.src = getSelectedImg()
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        lines.forEach(line => {
            if (!line.txt) return
            gCtx.lineWidth = '10'
            gCtx.strokeStyle = line.stroke
            gCtx.fillStyle = line.color
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.textAlign = line.align
            gCtx.strokeText(line.txt, line.posX, line.posY)
            gCtx.fillText(line.txt, line.posX, line.posY)
        })
        if (!isDownloading) {
            drawMark()
        }
    }

}

function drawMark() {
    var line = getSelectedLine()
    // if (!line.txt) return
    document.querySelector('.txt-input').value = line.txt
    var lineHeight = line.size * 1.286;
    var textWidth = getTextWidth()
    var text = line.txt
    // var textWidth = gCtx.measureText(text).width;
    console.log(textWidth)
    setStartEnd(textWidth, lineHeight)
    gCtx.lineWidth = '4'
    gCtx.strokeStyle = 'black'

    if (line.align === 'center') {
        gCtx.strokeRect(line.posX - textWidth / 2 - 10, line.posY - lineHeight + 10, textWidth + 17, lineHeight);
        // gCtx.strokeRect(line.coords.xStart, line.coords.yStart - 30, textWidth, lineHeight);
    } else if (line.align === 'end') {
        gCtx.strokeRect(line.posX - textWidth - 8, line.posY - lineHeight + 10, textWidth + 17, lineHeight);
    } else {
        gCtx.strokeRect(line.posX - 8, line.posY - lineHeight + 10, textWidth + 17, lineHeight);
    }
    // renderCanvas()
}


function onUpdateLine(txt) {
    updateLine(txt)
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    renderCanvas()
}

function renderGallery() {
    var imgs = getImgsToDisplay()

    var strHTMLs = imgs.map(img => {
        return `
     <img onclick="onUpdateSelectedImg(${img.id})" src="${img.url}" >`
    })
    var elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.innerHTML = strHTMLs.join('')
}
function onUpdateSelectedImg(imgId) {
    updateSelectedImg(imgId)
    document.querySelector('.meme-container').style.display = 'block';
    document.querySelector('.gallery').style.display = 'none'
    resizeCanvas()
    renderCanvas()

}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderCanvas()
}



function onChangeLine(diff) {
    updateLinePosY(diff)
    renderCanvas()
}


function onSetAlign(alignType) {
    setAlign(alignType)
    renderCanvas()

}

function onDisplayGallery() {
    document.querySelector('.meme-container').style.display = 'none';
    document.querySelector('.gallery').style.display = 'block'
    onResetCanvas()
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetWidth
    renderCanvas()
}


function downloadCanvas(elLink) {
    isDownloading = true;
    renderCanvas()

    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'meme'
}

function onSetFontColor(color) {
    setFontColor(color)
    renderCanvas()

}

function onSetStrokeColor(strokeColor) {
    setStrokeColor(strokeColor)
    renderCanvas()
}

function onSwitchLine() {
    updateSelectedLine()
    renderCanvas()
}

function onDeleteLine() {
    deleteLine()
    renderCanvas()
}

function onAddLine() {
    addLine(gCanvas.width)
    renderCanvas()
}

function onChangeFont(font) {
    changeFont(font)
    renderCanvas()
}


function onResetCanvas() {
    document.querySelector('.txt-input').value = ' '
    resetCanvas()
}




// dragging

function onIsPainting(ev) {
    // ev = eventHandler(ev)
    var { offsetX, offsetY } = ev

    console.log(offsetX, offsetY)
    // if (ev.type === 'mousedown') {
    //     var { offsetX, offsetY } = ev
    // }
    // if (ev.type === 'touchstart') {
    //     //    debugger;
    //     var rect = ev.target.getBoundingClientRect();
    //     var offsetX = ev.targetTouches[0].pageX - rect.left;
    //     var offsetY = ev.targetTouches[0].pageY - rect.top;
    // }
    var idx = checkLine(offsetX, offsetY)
    if (idx === -1) return
    updateCoords(offsetX, offsetY, idx)
    isDragging = true;
    renderCanvas()
    // drawMark()
}



// function eventHandler(ev) {
//     if (ev.type === 'mousedown' || ev.type === 'mousemove' ) {
//         var ev = {
//             offsetX: ev.offsetX,
//             offsetY: ev.offsetY
//         }
//     }
//     if (ev.type === 'touchstart' || ev.type === 'touchmove' ) {
//         //    debugger;
//         var rect = ev.target.getBoundingClientRect();
//         var ev = {
//             offsetX: ev.targetTouches[0].pageX - rect.left,
//             offsetY: ev.targetTouches[0].pageY - rect.top
//         }
//     }

//     return ev
// }


function onPaint(ev) {
    // ev = eventHandler(ev)
    var { offsetX, offsetY } = ev
    var idx = checkLine(offsetX, offsetY)
    if (idx !== -1) {
        document.body.style.cursor = 'move';
    } else document.body.style.cursor = 'default';

    if (!isDragging) return
    var { offsetX, offsetY } = ev

    updateCoords(offsetX, offsetY)
    renderCanvas()

}


function onStopPaint() {
    isDragging = false;
}





// function drawText(text, x, y, fontSize, align, color, strokeColor, fontFamily) {
//     // console.log('x', x, 'y', y)
//     gCtx.lineWidth = '10'
//     gCtx.strokeStyle = strokeColor
//     gCtx.fillStyle = color
//     gCtx.font = fontSize + 'px ' + fontFamily
//     gCtx.textAlign = align
//     gCtx.strokeText(text, x, y)
//     gCtx.fillText(text, x, y)
// }