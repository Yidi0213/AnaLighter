const url = "https://analighter-backend.herokuapp.com/nlu/";

chrome.runtime.onMessage.addListener((msg, sender, sendReponse) => {
  switch (msg.type) {
    case "relay":
      data = {
        limit: msg.limit,
        text: msg.text,
        emotion: false,
        sentiment: false,
      };

      fetch(url, {
        method: "POST",
        cache: "no-cache",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          chrome.tabs.query({ active: true, currentWindow: true }, function (
            tabs
          ) {
            chrome.tabs.sendMessage(tabs[0].id, {
              type: "keywords",
              res: data,
            });
          });
        })
        .catch((error) => {
          // console.log(error);
          chrome.tabs.query({ active: true, currentWindow: true }, function (
            tabs
          ) {
            chrome.tabs.sendMessage(tabs[0].id, {
              type: "failure",
            });
          });
        });
      break;
    case "on":
      chrome.browserAction.setBadgeText({ text: "ON", tabId: sender.tab.id });
      chrome.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });
      break;
    case "off":
      chrome.browserAction.setBadgeText({ text: "", tabId: sender.tab.id });
      break;
    default:
      alert("msg.type is not defined");
  }
});
