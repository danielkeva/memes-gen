'use strict';
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: null,
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

var gImgs = createImgs()




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