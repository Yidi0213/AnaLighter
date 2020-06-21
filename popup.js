buttonText = ['Turn On', 'Turn Off'];
displayId = 0;
sentiment = true;
btnOnColor = 'green';
btnOffColor = 'grey';

window.onload = function() {
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{type:"startup"}, (res) => {
            displayId = res.status ? 1 : 0;
            sentiment = res.sentiment;
            document.getElementById("button").innerText = buttonText[displayId];
            document.getElementById("sentiment").style.backgroundColor = sentiment ? btnOnColor : btnOffColor;
            document.getElementById("sentiment").style.display = "block";
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

document.getElementById("sentiment").onclick = function() {
    sentiment = !sentiment;
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{type:"sentiment"});
    });
    document.getElementById("sentiment").style.backgroundColor = sentiment ? btnOnColor : btnOffColor;
}