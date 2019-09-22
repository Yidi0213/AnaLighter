## Inspiration
Have you ever run into a long document and had no idea where to start reading? Have you had a hard time extracting key information from a research paper? Have you ever had trouble looking for answers to your questions on a web page? Maybe you want your computer to analyze the whole passage beforehand and extract key information for you? Unfortunately, there doesn't exist any apps or chrome extensions with this function. Hence, we are ready to be the pioneer! With the help of machine learning, we built AnaLighter, an intelligent Chrome extension, to make your dream come true. Serving as your personal "secretary", it highlights key phrases to enhance your web browsing experience and save your invaluable time. 

## What it does
When a web page is loaded, AnaLighter extracts all its text contents. It then utilizes Natural Language Understanding API from Microsoft's Azure to analyze the content and select its key phrases. Users can also specify the paragraph they want to focus on. After users select a paragraph, the key phrases from that paragraph, as well as their occurrences throughout the entire text, will be highlighted.

One of our goals with AnaLighter is to assist web users to process information more efficiently. Web users may want to rapidly extract key information from a verbose document (for example, a tedious email). AnaLighter provides an easily accessible interface to solve your problem. All you need to do is to select a paragraph you wish to read, and AnaLighter will **smartly analyze key phrases** of the paragraph in Azure Cloud and **highlight key phrases** for you. Occurrences of the key phrases in the entire text will also be highlighted, letting you view important key words much more easily and showing you the relationship between the selected paragraph and the entire document.

##Demo Video
[link](https://youtu.be/gucIY4mk6nw)

## How we built it
We built AnaLighter in JavaScript, HTML, CSS, BootStrap, and JSON. For the machine learning part, we utilized Microsoft's Azure Text Analytics API.

## Challenges we ran into
We ran into numerous challenges in our journey, from having to start with no knowledge of machine learning to node.js incompatibilities and trouble with designing user interface. Throughout these challenges, we learned a lot about the intricacies of Microsoft's Azure Text Analytics API and how to design a friendly user interface.

## Accomplishments that we're proud of
Up to now, we successfully built the Chrome extension that can extract key phrases and highlight them. We also overcame various hurdles and learned a lot through this HackAThon, from linking together JavaScript and machine learning API to designing user interfaces. 

## What's next for AnaLighter
Next, we would love to add more features to AnaLighter. For instance, we plan to add more useful analysis, such as sentiment (positive or negative), emotion (Joy, Anger and more), categories (sports, travel, movies, and more). Some more specific features can be, for instance, quickly detecting urgent emails from users' email inbox. We wrote some spaghetti code, so another goal is to clean our code and make it elegant, concise, and functional, just like what we learned in COMP215.

## How to Use?
Download all files in the github into a single local directory. Then open _chrome://extensions/_ in chrome. Make sure developer mode is on, and click _load unpacked_. After that, there should be AnaLighter log in the right up chrome extension lists. Click it and you are ready to use!