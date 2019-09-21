
console.log("Chrome extension is working!");

function Hilitor(id, tag) {

    var targetNode = document.getElementById(id) || document.body;
    var hiliteTag = tag || "EM";
    var skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM)$");
    var colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
    var wordColor = [];
    var colorIdx = 0;
    var matchRegex = "";
    var openLeft = false;
    var openRight = false;

    this.setMatchType = function (type) {
        switch (type) {
            case "left":
                this.openLeft = false;
                this.openRight = true;
                break;
            case "right":
                this.openLeft = true;
                this.openRight = false;
                break;
            case "open":
                this.openLeft = this.openRight = true;
                break;
            default:
                this.openLeft = this.openRight = false;
        }
    };

    this.setRegex = function (input) {
        input = input.replace(/[^\w0-9\\u ]+/, "").replace(/[ ]+/g, "|");
        var re = "(" + input + ")";
        if (!this.openLeft) re = "\\b" + re;
        if (!this.openRight) re = re + "\\b";
        matchRegex = new RegExp(re, "i");
    };

    this.getRegex = function () {
        var retval = matchRegex.toString();
        retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
        retval = retval.replace(/\|/g, " ");
        return retval;
    };

    // recursively apply word highlighting
    this.hiliteWords = function (node) {
        if (node == undefined || !node) return;
        if (!matchRegex) return;
        if (skipTags.test(node.nodeName)) return;

        if (node.hasChildNodes()) {
            for (var i = 0; i < node.childNodes.length; i++)
                this.hiliteWords(node.childNodes[i]);
        }
        if (node.nodeType == 3) { // NODE_TEXT
            if ((nv = node.nodeValue) && (regs = matchRegex.exec(nv))) {
                if (!wordColor[regs[0].toLowerCase()]) {
                    wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
                }

                var match = document.createElement(hiliteTag);
                match.appendChild(document.createTextNode(regs[0]));
                match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
                match.style.fontStyle = "inherit";
                match.style.color = "#000";

                var after = node.splitText(regs.index);
                after.nodeValue = after.nodeValue.substring(regs[0].length);
                node.parentNode.insertBefore(match, after);
            }
        };
    };

    // remove highlighting
    this.remove = function () {
        var arr = document.getElementsByTagName(hiliteTag);
        while (arr.length && (el = arr[0])) {
            var parent = el.parentNode;
            parent.replaceChild(el.firstChild, el);
            parent.normalize();
        }
    };

    // start highlighting at target node
    this.apply = function (input) {
        this.remove();
        if (input === undefined || !input) return;
        input = convertCharStr2jEsc(input);
        this.setRegex(input);
        this.hiliteWords(targetNode);
    };

    // added by Yanosh Kunsh to include utf-8 string comparison
    function dec2hex4(textString) {
        var hexequiv = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
        return hexequiv[(textString >> 12) & 0xF] + hexequiv[(textString >> 8) & 0xF] + hexequiv[(textString >> 4) & 0xF] + hexequiv[textString & 0xF];
    }

    function convertCharStr2jEsc(str, cstyle) {
        // Converts a string of characters to JavaScript escapes
        // str: sequence of Unicode characters
        var highsurrogate = 0;
        var suppCP;
        var pad;
        var n = 0;
        var outputString = '';
        for (var i = 0; i < str.length; i++) {
            var cc = str.charCodeAt(i);
            if (cc < 0 || cc > 0xFFFF) {
                outputString += '!Error in convertCharStr2UTF16: unexpected charCodeAt result, cc=' + cc + '!';
            }
            if (highsurrogate != 0) { // this is a supp char, and cc contains the low surrogate
                if (0xDC00 <= cc && cc <= 0xDFFF) {
                    suppCP = 0x10000 + ((highsurrogate - 0xD800) << 10) + (cc - 0xDC00);
                    if (cstyle) {
                        pad = suppCP.toString(16);
                        while (pad.length < 8) {
                            pad = '0' + pad;
                        }
                        outputString += '\\U' + pad;
                    } else {
                        suppCP -= 0x10000;
                        outputString += '\\u' + dec2hex4(0xD800 | (suppCP >> 10)) + '\\u' + dec2hex4(0xDC00 | (suppCP & 0x3FF));
                    }
                    highsurrogate = 0;
                    continue;
                } else {
                    outputString += 'Error in convertCharStr2UTF16: low surrogate expected, cc=' + cc + '!';
                    highsurrogate = 0;
                }
            }
            if (0xD800 <= cc && cc <= 0xDBFF) { // start of supplementary character
                highsurrogate = cc;
            } else { // this is a BMP character
                switch (cc) {
                    case 0:
                        outputString += '\\0';
                        break;
                    case 8:
                        outputString += '\\b';
                        break;
                    case 9:
                        outputString += '\\t';
                        break;
                    case 10:
                        outputString += '\\n';
                        break;
                    case 13:
                        outputString += '\\r';
                        break;
                    case 11:
                        outputString += '\\v';
                        break;
                    case 12:
                        outputString += '\\f';
                        break;
                    case 34:
                        outputString += '\\\"';
                        break;
                    case 39:
                        outputString += '\\\'';
                        break;
                    case 92:
                        outputString += '\\\\';
                        break;
                    default:
                        if (cc > 0x1f && cc < 0x7F) {
                            outputString += String.fromCharCode(cc);
                        } else {
                            pad = cc.toString(16).toUpperCase();
                            while (pad.length < 4) {
                                pad = '0' + pad;
                            }
                            outputString += '\\u' + pad;
                        }
                }
            }
        }
        return outputString;
    }

}

// Starts listening for changes in the root HTML element of the page.
// var mutationObserver = new MutationObserver(function(mutations) {
//     setTimeout(function() {
//         if (mutations !== null) {
//             text = document.body.innerText;
//             var result = generateKeyPhrase(text);
//         }
//     }, 500);
// });

// mutationObserver.observe(document.documentElement, {
//     attributes: true,
//     characterData: true,
//     childList: true,
//     subtree: true,
//     attributeOldValue: true,
//     characterDataOldValue: true
// });

var h = new Hilitor();

document.onmouseup = function() {
    setTimeout(function(){}, 300);
    setTimeout(function() {
        h.remove();
        var text = document.body.innerText.replace(new RegExp('\n([^ ]+\s){1,5}\n', 'g'), "");
        generateKeyPhrase(text);
    }, 1000);
};



function generateKeyPhrase(s) {
    s = s.slice(0,5120);
    var find = '"';
    var re = new RegExp(find, 'g');
    s = s.replace(re, "\\\"");

    //Microsoft Azure
    let url = "https://gosrgeowgrmep.cognitiveservices.azure.com/text/analytics/v2.1/keyPhrases";
    let data = '{"documents": [{"language": "en", "id": "1", "text": "' + s + '"}]}';


    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    //Microsoft Azure
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key', '8c8a84402f3440f8a55039d115c54a88');
    xhr.setRequestHeader('Content-Type', 'application/json');


    xhr.send(data);
    xhr.onreadystatechange = function() {
        var response = xhr.responseText;
        if (response != "") {
<<<<<<< HEAD
            if (JSON.parse(response).documents != undefined) {
                var result = JSON.parse(response).documents[0].keyPhrases;
                console.log(result[0]);
                h.apply(result[0]);

            }
=======
            var result = JSON.parse(response).documents[0].keyPhrases;

            var h = new Hilitor();
            // h.apply(result[0]);

            h.setBreakRegExp(new RegExp('[^\\w\' -]+', "g")); // expanded to include spaces
            h.apply(result[0]);
            // h.apply(result[1]);



>>>>>>> f78f5402da31aa1eee88f251c2bd94079219794f
        }
    };
}

console.log(document.body.innerText)
var text = document.body.innerText.replace(new RegExp('\n([^ ]+\s){1,5}\n', 'g'), "");
console.log(text);
generateKeyPhrase(text);

