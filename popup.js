buttonText = ['Turn On', 'Turn Off'];
displayId = 0;
emotion = true;
sentiment = true;

window.onload = function() {
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{type:"startup"}, (res) => {
            displayId = res.status ? 1 : 0;
            emotion = res.emotion;
            sentiment = res.sentiment;
            document.getElementById("button").innerText = buttonText[displayId];
            // document.getElementById("emotion").style.visibility = "visible";
            // document.getElementById("sentiment").style.visibility = "visible";
            document.getElementById("emotion").style.backgroundColor = emotion ? "blue" : "gray";
            document.getElementById("sentiment").style.backgroundColor = sentiment ? "blue" : "gray";
            // document.getElementById("emotion").style.visibility = "visible";
            // document.getElementById("sentiment").style.visibility = "visible";
            document.getElementById("emotion").style.display = "block";
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

document.getElementById("emotion").onclick = function() {
    emotion = !emotion;
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{type:"emotion"});
    });
    document.getElementById("emotion").style.backgroundColor = emotion ? "blue" : "gray";
}

document.getElementById("sentiment").onclick = function() {
    sentiment = !sentiment;
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{type:"sentiment"});
    });
    document.getElementById("sentiment").style.backgroundColor = sentiment ? "blue" : "gray";
}