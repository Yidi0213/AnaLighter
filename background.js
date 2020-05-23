// chrome.runtime.onMessage.addListener((response, sender, sendReponse) => {
//     alert(response);
// });


chrome.runtime.onMessage.addListener((msg,sender,sendReponse) =>{
    switch(msg.type){
        case("relay"):
            let url = encodeURI("http://analighter-backend.herokuapp.com/nlu/?text=" + msg.text);
            fetch(url)
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                                chrome.tabs.sendMessage(tabs[0].id, {
                                    type: "relayb",
                                    res: data
                                }); 
                            });
            });
            break;
        case("on"):
            chrome.browserAction.setBadgeText({text: 'ON',tabId:sender.tab.id});
            chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
            break;
        case("off"):
            chrome.browserAction.setBadgeText({text: '',tabId:sender.tab.id});
            break;
        default:
            alert("msg.type is not defined");
    }

});

