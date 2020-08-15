document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    const displaySquares = document.querySelectorAll('.previous-grid div');
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const startButton = document.querySelector('#start');
    const scoreDisplay = document.querySelector('.score-display');
    const linesDisplay = document.querySelector('.lines-display');
    const width = 10;
    let nextRandom = 0;
    let currentPositionOfCurrentTetromino = 4;
    let currentIndex = 0;
    let timerId;
    let score = 0;
    let lines = 0;

    //Keyboard controls here
    function control(e){
        switch(e.keyCode){
            case 39:
                console.log('right');
                moveRight();
                break;
            case 38:
                console.log('up');
                rotate();
                break;
            case 37:
                console.log('left');
                moveLeft();
                break;
            case 40:
                console.log('down');
                moveDown();
                break;
        }
    }

    document.addEventListener('keyup', control);

    //The Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const Tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    //Select random tetromino
    let randomTetrominoIndex = Math.floor(Math.random()*Tetrominoes.length);
    let currentRotationOfTetromino = 0;
    let currentRotationIndex = Tetrominoes[randomTetrominoIndex][currentRotationOfTetromino];

    //add blocks
    function draw(){
        currentRotationIndex.forEach(index => (
            squares[currentPositionOfCurrentTetromino + index].classList.add('block')
        ));
    }
    //remove blocks
    function unDraw(){
        currentRotationIndex.forEach(index => (
            squares[currentPositionOfCurrentTetromino + index].classList.remove('block')
        ));
    }    
    //move tetromino down
    function moveDown(){
        unDraw();
        currentPositionOfCurrentTetromino += width;
        draw();
        freeze();
    }

    //move right and left and prevent shapes by detecting collisions
    function moveRight(){
        unDraw();
        const isAtRightEdge = currentRotationIndex.some(index => (currentPositionOfCurrentTetromino + index) % width === width - 1);
        if(!isAtRightEdge) currentPositionOfCurrentTetromino += 1;
        if(currentRotationIndex.some(index => squares[currentPositionOfCurrentTetromino + index].classList.contains('block2'))){
            currentPositionOfCurrentTetromino -= 1;
        }
        draw();
    }
    function moveLeft(){
        unDraw();
        const isAtLeftEdge = currentRotationIndex.some(index => (currentPositionOfCurrentTetromino + index) % width === 0);
        if(!isAtLeftEdge) currentPositionOfCurrentTetromino -= 1;
        if(currentRotationIndex.some(index => squares[currentPositionOfCurrentTetromino + index].classList.contains('block2'))){
            currentPositionOfCurrentTetromino += 1;
        }
        draw();
    }

    function rotate(){
        unDraw();
        currentRotationOfTetromino++;
        if(currentRotationOfTetromino === currentRotationIndex.length){
            currentRotationOfTetromino = 0;
        }
        currentRotationIndex = Tetrominoes[randomTetrominoIndex][currentRotationOfTetromino];
        draw();
    }

    //showing previous tetrominoes
    const displayWidth = 4;
    const displayIndex = 0;

    const smallTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
        [0, 1, displayWidth, displayWidth+1], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
      ]

    function displayShapes(){
        displaySquares.forEach(square => {
            square.classList.remove('block');
        })
        smallTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('block');
        })
    }

    //freeze shape when touching ground
    function freeze(){
        if(currentRotationIndex.some(index => squares[currentPositionOfCurrentTetromino + index + width].classList.contains('block3') 
        || squares[currentPositionOfCurrentTetromino + index + width].classList.contains('block2'))){
            currentRotationIndex.forEach(index => squares[index + currentPositionOfCurrentTetromino].classList.add('block2'));
            randomTetrominoIndex = nextRandom;
            nextRandom = Math.floor(Math.random() * Tetrominoes.length);
            currentRotationIndex = Tetrominoes[randomTetrominoIndex][currentRotationOfTetromino];
            currentPositionOfCurrentTetromino = 4;
            unDraw();
            draw();
            displayShapes();
            addScore();
            gameOver();
        }
    }

    startButton.addEventListener('click', ()=> {
        if(timerId){
            clearInterval(timerId);
            timerId = null;
        }else{
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * Tetrominoes.length);
            displayShapes();
        }
    })

    //game over function
    function gameOver(){
        if(currentRotationIndex.some(index => squares[currentPositionOfCurrentTetromino + index].classList.contains('block2'))){
            scoreDisplay.innerHTML = 'End';
            clearInterval(timerId);
        } 
    }

    // score logic
    function addScore(){
        for(currentIndex = 0; currentIndex < 199; currentIndex += width){
            const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4,
                currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9];

            if(row.every(index => squares[index].classList.contains('block2'))){
                score+=10;
                lines+=1;
                scoreDisplay.innerHTML = score;
                linesDisplay.innerHTML = lines;
                row.forEach(index => {
                    squares[index].classList.remove('block2') || squares[index].classList.remove('block')
                })
                //splice array
                const squaresRemoved = squares.splice(currentIndex, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
        }
    }
})