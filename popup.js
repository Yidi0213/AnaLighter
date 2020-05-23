buttonText = ['Turn On', 'Turn Off'];
displayId = 0;

window.onload = function() {
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{type:"startup"}, (res) => {
            displayId = res.status ? 1 : 0;
            document.getElementById("button").innerText = buttonText[displayId];
        });
    })
}

document.getElementById("button").onclick = function() {
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{type:"switch"});
        displayId = 1 - displayId;
        document.getElementById("button").innerText = buttonText[displayId];
    })
};