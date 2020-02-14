'use strict';

var gCanvas;
var gCtx;

function onInit() {
    document.querySelector('.meme-container').style.display = 'none';
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
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
            drawText(line.txt, line.posX, line.posY, line.size, line.align, line.color, line.font)
        })
        drawMark()
    }

}

function drawMark() {
    var line = getSelectedLine()
    // if (!line.txt) return
    var fontsize = line.size;
    var lineHeight = fontsize * 1.286;
    var textWidth = gCtx.measureText(line.txt).width;
    gCtx.lineWidth = '4'

    if (line.align === 'center') {
        gCtx.strokeRect(line.posX - textWidth / 2 - 10, line.posY - lineHeight + 10, textWidth + 17, lineHeight);
    } else if (line.align === 'end') {
        gCtx.strokeRect(line.posX - textWidth - 8, line.posY - lineHeight + 10, textWidth + 17, lineHeight);
    } else {
        gCtx.strokeRect(line.posX - 8, line.posY - lineHeight + 10, textWidth + 17, lineHeight);
    }
}


function drawText(text, x, y, fontSize, align, color, fontFamily) {
    gCtx.lineWidth = '10'
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = fontSize + 'px ' + fontFamily
    gCtx.textAlign = align
    gCtx.strokeText(text, x, y)
    gCtx.fillText(text, x, y)
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
    document.querySelector('.gallery').style.display = 'block'
    document.querySelector('.meme-container').style.display = 'none';
}

function resizeCanvas() { // not finished 
    var elContainer = document.querySelector('.canvas-container');
    
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetWidth
    renderCanvas()
}


function downloadCanvas(elLink) {
    renderCanvas()
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'meme'
}

function onSetColor(color) {
    setColor(color)
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
    addLine()
    renderCanvas()
}

function onChangeFont(font) {
    changeFont(font)
    renderCanvas()
}