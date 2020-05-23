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
                                    type: "keywords",
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
    // if (msg.type == "relay") {
    //     // Microsoft Azure
    //     // let url = "https://gosrgeowgrmep.cognitiveservices.azure.com/text/analytics/v2.1/keyPhrases";
    //     // let data = '{"documents": [{"language": "en", "id": "1", "text": "' + s + '"}]}';
        
    //     // Custom Backend
    //     const s = msg.text;
    //     let url = encodeURI("http://analighter-backend.herokuapp.com/nlu/?text=" + s);

    //     // console.log(url);

    //     // var xhr = new XMLHttpRequest();

    //     // Microsoft Azure
    //     // xhr.setRequestHeader('Ocp-Apim-Subscription-Key', '8c8a84402f3440f8a55039d115c54a88');
    //     // xhr.setRequestHeader('Content-Type', 'application/json');

    //     // xhr.addEventListener("load", function() {
    //     //     if (this.readyState === 4) {
    //     //         var response = this.response + "";
    //     //         console.log(response);
    //     //         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     //             chrome.tabs.sendMessage(tabs[0].id, {
    //     //                 type: "relayb",
    //     //                 res: response
    //     //             }); 
    //     //         });
    //     //     }
    //     // });

    //     //use fetch to make codes leaner
    //     fetch(url)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data);
    //         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //                         chrome.tabs.sendMessage(tabs[0].id, {
    //                             type: "relayb",
    //                             res: data
    //                         }); 
    //                     });
    //     });

    //     // xhr.open("GET", url);
    //     // xhr.send();
    //     // sendResponse();
    // } else if (msg.type == "on"){
    //     chrome.browserAction.setBadgeText({text: 'ON',tabId:sender.tab.id});
    //     chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
    // } else if (msg.type =="off"){
    //     chrome.browserAction.setBadgeText({text: '',tabId:sender.tab.id});
    // }
});

