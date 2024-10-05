const jogoTela = document.querySelector('.quadro');
const pontuacaoObj = document.querySelector('.score');
const highPontObj = document.querySelector('.high-score');
const controles = document.querySelectorAll('.controles i');

let gameOver = false;

let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = []
let setIntervalID;

let score = 0;

let highScore = localStorage.getItem('high-score') || 0;
highPontObj.innerText = `Melhor: ${highScore}`;

const updateFoodPosition = () =>{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalID);
    alert('Você Perdeu! Aperte OK para Recomeçar');
    location.reload();
}

const changeDirection = e =>{
    if (e.key === 'ArrowUp' && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === 'ArrowDown' && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === 'ArrowLeft' && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

controles.forEach(button => button.addEventListener('click', () => changeDirection({key: button.dataset.key})));

const initGame = () =>{
    if(gameOver) return handleGameOver();
    let html = `<div class= "food" style = "grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY){
        updateFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        
        localStorage.setItem('high-score', highScore)
        pontuacaoObj.innerText = `Pontuação: ${score}`
        highPontObj.innerText = `Melhor: ${highScore}`;
    }


    snakeX += velocityX;
    snakeY += velocityY;


    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        return gameOver = true;
    }

    for(let i = 0; i < snakeBody.length; i++){
        html += `<div class= "head" style = "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }

    jogoTela.innerHTML = html;
}

updateFoodPosition();
setIntervalID = setInterval(initGame, 100);
document.addEventListener('keyup', changeDirection)


