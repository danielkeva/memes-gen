'use strict';
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: null,
            size: 40,
            posX: 225,
            posY: 70,
            align: 'left',
            color: 'red'
        },
        {
            txt: null,
            size: 40,
            posX: 225,
            posY: 400,
            align: 'left',
            color: 'red'
        }
    ]
}

var gImgs = createImgs()


function getLines() {
    return gMeme.lines
}

function updateSelectedLine(idx) {
    gMeme.selectedLineIdx = idx
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}
function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getSelectedImg() {
    var img = gImgs.find(img => {
        return img.id === gMeme.selectedImgId
    })
    return img.url
}


function getTxtToDisplay() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function updateLine(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function createImgs() {
    var imgs = []
    var id = 0
    for (var i = 0; i < 2; i++) {
        imgs.push(
            { id: ++id, url: `img/${id}.jpg` }
        )
    }
    return imgs
}

function getImgsToDisplay() {
    return gImgs
}

function updateSelectedImg(imgId) {
    gMeme.selectedImgId = imgId

}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function updateLinePosY(diff) {
    gMeme.lines[gMeme.selectedLineIdx].posY += diff

}