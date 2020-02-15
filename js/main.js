'use strict';

var gCanvas;
var gCtx;
var isDragging;
var isMark;

var isDownloadClicked;
function onInit() {
    isDownloadClicked = false
    isDragging = false;

    isMark = true;
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



function renderCanvas(newImg) {
    var lines = getLines()
    if (!newImg) {
        var img = new Image()
        img.src = getSelectedImg()
    } else {
        var img = new Image()
        img.src = newImg.src
    }

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

            var lineHeight = line.size * 1.286;
            var textWidth = getTextWidth()
            setStartEnd(textWidth, lineHeight)


        })
        if (isMark) {
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
    isMark = true
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
    document.querySelector('.file-input').value = ''
    resetCanvas()
}




// dragging

function onStartMove(ev) {
    var { offsetX, offsetY } = ev
    var line = getSelectedLine()

    var idx = checkLine(offsetX, offsetY)
    if (idx === -1) {
        isMark = false;
        renderCanvas()
        return
    }
    isMark = true
    updateCoords(offsetX, offsetY, idx)
    isDragging = true;
    renderCanvas()
    // drawMark()
}



function onMove(ev) {
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


function onStopMove() {
    isDragging = false;

}



function onDownloadCanvas(ev) {
    // ev.preventDefault()
    if (isDownloadClicked) return
    isMark = false

    renderCanvas()
    setTimeout(() => {

        downloadCanvas(ev)
        isDownloadClicked = false
    }, 0);
    
}

function downloadCanvas() {


    var elLink = document.querySelector('.down-lnk')
    var data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'meme.png'
    isDownloadClicked = true
    elLink.click()

}



function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}
function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
        updateNewImg(img)
    }

    reader.readAsDataURL(ev.target.files[0]);
    document.querySelector('.meme-container').style.display = 'block';
    document.querySelector('.gallery').style.display = 'none'

}

function toggleNav(elHamburger) {
    elHamburger.classList.toggle("change");
    document.body.classList.toggle('menu-open');
}
