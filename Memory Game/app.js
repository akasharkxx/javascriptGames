document.addEventListener('DOMContentLoaded', ()=>{

    const cardArray = [
        {
            name: 'batman',
            img: 'images/batman.png'
        },
        {
            name: 'cat',
            img: 'images/cat.png'
        },
        {
            name: 'ironman',
            img: 'images/ironman.png'
        },
        {
            name: 'minion',
            img: 'images/minion.png'
        },
        {
            name: 'naruto',
            img: 'images/naruto.png'
        },
        {
            name: 'turtle',
            img: 'images/turtle.png'
        },
        {
            name: 'batman',
            img: 'images/batman.png'
        },
        {
            name: 'cat',
            img: 'images/cat.png'
        },
        {
            name: 'ironman',
            img: 'images/ironman.png'
        },
        {
            name: 'minion',
            img: 'images/minion.png'
        },
        {
            name: 'naruto',
            img: 'images/naruto.png'
        },
        {
            name: 'turtle',
            img: 'images/turtle.png'
        }
    ]

    cardArray.sort(() => 0.5 - Math.random())

    //creating my game board
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];

    function createBoard(){
        for(let i = 0; i < cardArray.length; i++){
            var card = document.createElement('img');
            card.setAttribute('src', 'images/Cover.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    //Checking for match
    function checkMatch(){
        var cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if(cardsChosen[0] === cardsChosen[1]){
            alert('You found a match');
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            cardsWon.push(cardsChosen);
        }else{
            cards[optionOneId].setAttribute('src', 'images/Cover.png');
            cards[optionTwoId].setAttribute('src', 'images/Cover.png');
            alert('Cards dont match');
        }

        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if(cardsWon.length == cardArray.length/2){
            resultDisplay.textContent = 'Congratulations!! You got em all';
        }
    }

    //flip onclick
    function flipCard(){
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if(cardsChosen.length == 2){
            setTimeout(checkMatch, 500);
        }
    }

    createBoard();

})