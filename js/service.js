'use strict';
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {

            txt: null,
            size: 70,
            posX: 225,
            posY: 100,
            align: 'center',
            color: 'white',
            font: 'impact'
        }
    ]
}

var gImgs = createImgs()


function getLines() {
    return gMeme.lines
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
    for (var i = 0; i < 18; i++) {
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
function setAlign(alignType){
    gMeme.lines[gMeme.selectedLineIdx].align = alignType
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}



function updateLinePosY(diff) {
    gMeme.lines[gMeme.selectedLineIdx].posY += diff

}


function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function updateSelectedLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length || gMeme.selectedLineIdx > gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }

}


function deleteLine() {
    if (gMeme.lines.length === 1 || gMeme.selectedLineIdx === 0) {
        gMeme.lines[gMeme.selectedLineIdx].txt = null
        gMeme.selectedLineIdx = 0
        return
    }

    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--
}


function addLine() {
    var newLine = createLine()
    gMeme.lines.push(newLine)
    var newLineIdx = gMeme.lines.findIndex(line => {
        return line === newLine
    })
    gMeme.selectedLineIdx = newLineIdx
}

function createLine() {
    if (gMeme.lines.length === 1) {
        var line = {

            txt: null,
            size: 70,
            posX: 225,
            posY: 400,
            align: 'center',
            color: 'white'
        }
        return line
    }


    var line = {

        txt: null,
        size: 70,
        posX: 225,
        posY: 225,
        align: 'center',
        color: 'white'
    }
    return line
}