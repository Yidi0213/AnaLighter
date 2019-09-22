# AnaLighter
A chrome extension that utilizes machine learning to analyzes the web page and highlights
key information intelligently.
## What is AnaLighter?
AnaLighter enables web users to select a text paragraph and view key 
phrases in that paragraph. It utilizes Natural Language Understanding from
Microsoft's Azure to analyze text and select key phrases. After the user selects 
a paragraph, the key phrases from that paragraph as well as their occurrences
throughout the entire text will be highlighted. For users' information, a popup message
containing the key phrases will also be displayed on the web page.

One of our goals with AnaLighter is to assist web users to process information
more efficiently. Web users may want to rapidly extract key information from 
a long document. AnaLighter utilizes a simple interface which is easily accessible.
All you need to do is to select a paragraph you wish to read, and AnaLighter will
highlight key phrases for you. Occurrences of the key phrases in the 
entire text will also be highlighted, showing the relationship between the selected
paragraph and the entire document.
## How we built AnaLighter
We built AnaLighter in JavaScript and used JSON to build the Chrome extension. For 
the machine learning part, we utilized Microsoft's Azure API.