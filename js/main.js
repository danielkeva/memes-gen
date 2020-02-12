'use strict';

var gCanvas;
var gCtx;
function onInit() {

    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    drawOnCanvas()
    renderGallery()
}

function drawOnCanvas() {
    onDrawImg()


}


function onDrawImg(txt) {
    var img = new Image()
    img.src = getSelectedImg()
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        if (!txt) return
        drawText(txt, gCanvas.width / 2, 60)

    }
}


function drawText(text, x, y) {
    // gCtx.restore();
    gCtx.lineWidth = '3'
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '50px Impact'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    // gCtx.save();

}

function onUpdateLine(txt) {
    updateLine(txt)
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    onDrawImg(txt)


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

function onUpdateSelectedImg(imgId){
    updateSelectedImg(imgId)
    onDrawImg()
}