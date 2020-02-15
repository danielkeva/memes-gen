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
            stroke: 'black',
            font: 'Impact',
            coords: { xStart: null, xEnd: null, yStart: null, yEnd: null }

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
function setAlign(alignType) {
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


function setFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function setStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = color;
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


function addLine(width) {
    var newLine = createLine(width)
    gMeme.lines.push(newLine)
    var newLineIdx = gMeme.lines.findIndex(line => {
        return line === newLine
    })
    gMeme.selectedLineIdx = newLineIdx
}

function createLine(width) {
    if (gMeme.lines.length === 1) {
        var line = {

            txt: null,
            size: 70,
            posX: width / 2,
            posY: width - 50,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'Impact',
            coords: { xStart: null, xEnd: null, yStart: null, yEnd: null }
        }
        return line
    }


    var line = {

        txt: null,
        size: 70,
        posX: width / 2,
        posY: width / 2,
        align: 'center',
        color: 'white',
        stroke: 'black',
        font: 'Impact',
        coords: { xStart: null, xEnd: null, yStart: null, yEnd: null }
    }
    return line
}


function resetCanvas() {
    gMeme = {
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
                stroke: 'black',
                font: 'Impact',
                coords: { xStart: null, xEnd: null, yStart: null, yEnd: null }
            }
        ]
    }
    gImgs = createImgs()
}

function updateCoords(newX, newY, idx) {
    if (idx || idx === 0) gMeme.selectedLineIdx = idx
    gMeme.lines[gMeme.selectedLineIdx].posX = newX
    gMeme.lines[gMeme.selectedLineIdx].posY = newY

}



function checkLine(offsetX, offsetY) {
    var idx = gMeme.lines.findIndex(line => {
        return offsetX > line.coords.xStart
            && offsetX < line.coords.xEnd
            && offsetY > line.coords.yStart
            && offsetY < line.coords.yEnd
    })

    return idx
}


function setStartEnd(width, height) {

    var currLine = gMeme.lines[gMeme.selectedLineIdx]

    currLine.coords.yStart = currLine.posY - height / 2
    currLine.coords.yEnd = currLine.posY + height / 2

    if (currLine.align === 'center') {
        currLine.coords.xStart = currLine.posX - width / 2
        currLine.coords.xEnd = currLine.posX + width / 2
    } else if (currLine.align === 'end') {
        currLine.coords.xStart = currLine.posX - width
        currLine.coords.xEnd = currLine.posX
    } else {
        currLine.coords.xStart = currLine.posX
        currLine.coords.xEnd = currLine.posX + width
    }


}


function getTextWidth() {
    var line = getSelectedLine()
    var elCalculator = document.querySelector('.text-width-calculator')
    elCalculator.innerText = line.txt;
    elCalculator.style.fontSize = line.size + 'px';
    elCalculator.style.fontFamily = line.font;
    var width = (+elCalculator.clientWidth);
    return width
}

function updateNewImg(img) {


    gImgs.push(
        { id: gImgs.length + 1, url: img.src }
    )
    gMeme.selectedImgId = gImgs.length
}