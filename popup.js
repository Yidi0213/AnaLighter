


document.getElementById("button").onclick = function() {
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{toggle:"switch"})
    })
};


