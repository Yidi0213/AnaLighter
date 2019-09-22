


document.getElementById("button").onclick = function() {
    let params = {
        active: true,
        currentWindow:true
    }
    chrome.tabs.query(params, gotTabs);
    function gotTabs(tabs){
        let msg = {
            toggle: "switch"
        }
        chrome.tabs.sendMessage(tabs[0].id,msg);
    }
};


