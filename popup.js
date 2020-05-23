buttonText = ['Turn On', 'Turn Off'];
displayId = 0;

document.getElementById("button").onclick = function() {
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{toggle:"switch"});
        displayId = 1 - displayId;
        document.getElementById("button").innerText = buttonText[displayId];
    })
};