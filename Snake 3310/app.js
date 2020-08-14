document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startButton = document.querySelector('.start')

    const width = 10;
    let currentIndex = 0; //first div in our grid
    let foodIndex = 0;  //first div in our grid
    let currentSnake = [2,1,0] //the div in our grid being 2 (HEAD), and 0 is tail , 1 is body parts
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    // start game or restart game
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[foodIndex].classList.remove('food');
        clearInterval(interval);
        score = 0;
        randomFood()
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutComes, intervalTime);
    }



    // function to handle collision and score for all things
    function moveOutComes(){
        if(
            (currentSnake[0] + width >= (width * width) && direction === width)|| //if snake hit the bottom 
            (currentSnake[0] % width === width-1 && direction === 1)|| //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1)|| //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width)|| //if snake hits top
            squares[currentSnake[0] + direction].classList.contains('snake')
        ){
            return clearInterval(interval) //clears interval if "If" condition is true
        }

        const tail = currentSnake.pop() //remove tail of snake array
        squares[tail].classList.remove('snake'); //remove tail before updating
        currentSnake.unshift(currentSnake[0] + direction); //gives the direction of head of the snake

        //food collision
        if(squares[currentSnake[0]].classList.contains('food')){
            squares[currentSnake[0]].classList.remove('food');
            squares[tail].classList.add['snake'];
            currentSnake.push(tail);
            randomFood();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutComes, intervalTime);
        }
        squares[currentSnake[0]].classList.add('snake');

    }

    function randomFood(){
        do{
            foodIndex = Math.floor(Math.random() * squares.length)
        } while(squares[foodIndex].classList.contains('snake'));
        squares[foodIndex].classList.add('food');
    }

    // function with keyCodes 
    function control(e){

        squares[currentIndex].classList.remove('snake');

        if(e.keyCode === 39){
            direction = 1; //right arrow
        }else if(e.keyCode === 38){
            direction = -width; //up arrow
        }else if(e.keyCode === 37){
            direction = -1 //left arrow
        }else if(e.keyCode === 40 ){
            direction = +width; //down arrow
        }
    }

    document.addEventListener('keyup', control);
    startButton.addEventListener('click', startGame);
})