
var Size = {
    SMALL : {
        width : 320,
        height : 180
    },
    DEFAULT : {
        width : 640,
        height : 360
    }
}

chrome.storage.local.clear();
chrome.pageAction.onClicked.addListener(function(tab) {

    var storageKey = 'resize-' + tab.id;

    chrome.storage.local.get(storageKey, function(result) {
        executeResize(storageKey, result[storageKey]);
    });
});

function executeResize(storageKey, resizeEnabled) {

    var objectToStore = { };

    if(resizeEnabled) {
        // default size
        applySizeToYouTubePlayer(Size.DEFAULT);

        objectToStore[storageKey] = false;
        chrome.storage.local.set(objectToStore);
    } else {
        // small size
        applySizeToYouTubePlayer(Size.SMALL);

        objectToStore[storageKey] = true;
        chrome.storage.local.set(objectToStore);
    }
}

function applySizeToYouTubePlayer(size) {

    var width = size.width;
    var height = size.height;

    var script = 'document.getElementsByClassName("video-stream html5-main-video")[0].style.width = \'' + width + 'px\';'
    + 'document.getElementsByClassName("video-stream html5-main-video")[0].style.height = \'' + height + 'px\';'
    + 'document.getElementsByClassName("video-stream html5-main-video")[0].style.left = \'' + 0 + 'px\';'
    + 'document.getElementsByClassName("html5-video-player ytp-hide-info-bar")[0].style.width = \'' + width + 'px\';'
    + 'document.getElementById("player-container").style.width = \'' + width + 'px\';'
    + 'document.getElementById("player-container").style.height = \'' + height + 'px\';';

    chrome.tabs.executeScript({
        code: script
    });
}