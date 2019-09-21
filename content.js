// console.log("It is rainning today");

// $(".alertClick").click(()=>alert('Lol'));
// $(".alertClick").on('mouseover',
//     $("p").html(' s')
//     );
console.log("Chrome extension is working!");

console.log(document.body.innerText);

var mutationObserver = new MutationObserver(function(mutations) {
    if (mutations !== null) {
        console.log(document.body.innerText);
    }
});

// Starts listening for changes in the root HTML element of the page.
mutationObserver.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
});


// let elts = document.getElementsByTagName('p');
// for(var i = 0; i< elts.length; i++){
//     elts[i].style['background-color'] = '#F0C';
// }
// $(window).load(()=> $("p").css('background-color', '#F0C'));
// $("p").css('background-color','#F0C');