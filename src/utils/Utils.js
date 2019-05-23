
function parseTranslate3d (el) {
    const style = el.style
    const transform = style.transform || style.webkitTransform || style.mozTransform
    const parsingData = transform.match(/[+-]?\d*(\.?\d*)(px)/g).map((item) => parseInt(item))
    return {
        x: parsingData[0],
        y: parsingData[1],
        z: parsingData[2]
    }
}

function getPlatform () {
    const filter = 'win16|win32|win64|mac|macintel'
    if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            return 'mobile'
        } else {
            return 'pc'
        }
    }
}

function isMobile () {
    return getPlatform() === 'mobile'
    // return true;
}

function getTextWidth (text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
    var context = canvas.getContext('2d')
    context.font = font
    var metrics = context.measureText(text)
    return metrics.width
}

export {
    parseTranslate3d,
    getPlatform,
    isMobile,
    getTextWidth
}
