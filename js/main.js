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
    var img = new Image()
    img.src = getSelectedImg()
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        if (!txt) return
        drawText(txt, gCanvas.width / 2, linePosY)
        // gCtx.save();

    }

}


function drawText(text, x, y) {
    var selectedLine = getSelectedLine()
    gCtx.lineWidth = '3'
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = selectedLine.size + 'px Impact'
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
    changeFontSize(diff)

    onDrawImg()
    // gCtx.restore()
}



function onChangeLine(diff) {
    linePosY += diff
    onDrawImg()
}




