chrome.runtime.sendMessage("hello, World!");
let params = {
    active: true,
    currentWindow:true
}
chrome.tabs.query(params, gotTabs);
function gotTabs(tabs){
    let message = "Hello, world!";
    let msg = {
        txt: "hello"
    }
    chrome.tabs.sendMessage(tabs[0].id,msg);
}