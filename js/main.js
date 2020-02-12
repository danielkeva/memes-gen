'use strict';

var gCanvas;
var gCtx;
var linePosY = 70

function onInit() {

    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    drawOnCanvas()
    renderGallery()
}

function drawOnCanvas() {
    onDrawImg()


}


function onDrawImg() {
    var txt = getTxtToDisplay()
    var line = getSelectedLine()
    var lines = getLines()
    var img = new Image()
    img.src = getSelectedImg()
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        lines.forEach(line => {
            if (!line.txt) return
            drawText(line.txt, line.posX, line.posY, line.size)
        })


    }

}


function drawText(text, x, y, fontSize) {
    var selectedLine = getSelectedLine()
    gCtx.lineWidth = '3'
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = fontSize + 'px Impact'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

}

function onUpdateLine(txt) {
    updateLine(txt)

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

    onDrawImg()


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
    onDrawImg()
}

function onChangeFontSize(diff) {
    // debugger
    changeFontSize(diff)

    onDrawImg()
    // gCtx.restore()
}



function onChangeLine(diff) {
    updateLinePosY(diff)
    onDrawImg()
}

function onSwitchLine() {
    var currLine = getSelectedLineIdx()
    if (currLine === 0) {
        currLine = 1
    } else {
        currLine = 0
    }
    updateSelectedLine(currLine)
}



