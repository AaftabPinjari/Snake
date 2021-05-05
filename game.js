const GRID_SIZE = 21

let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')
const SNAKE_SPEED = 4
const snakeBody = [{ x: 11, y: 11 }]
let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }
let food = randomFood()
let LENGTH_INCREASE = 1
let newSegments = 0

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: -1 }
            break;
        case 'ArrowDown':
            if (lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: 1 }
            break;
        case 'ArrowLeft':
            if (lastInputDirection.x !== 0) break
            inputDirection = { x: -1, y: -0 }
            break;
        case 'ArrowRight':
            if (lastInputDirection.x !== 0) break
            inputDirection = { x: 1, y: 0 }
            break;

        default:
            break;
    }
})


function getInputDirection() {
    lastInputDirection = inputDirection
    return inputDirection
}
// update snake

function updateSnake() {
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
    addSegments()
}
//draw snake
function drawSnake() {
    gameBoard.innerHTML = ''
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}
//draw food 
function drawFood() {

    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)

}
//update food
function updateFood() {
    if (snakeAte(food)) {
        increaseSnake(LENGTH_INCREASE)
        food = randomFood()
    }
    addSegments()
}

function increaseSnake(amount) {
    newSegments += amount
}

function snakeAte(position) {
    return snakeBody.some(segment => {
        return equalPositions(segment, position)
    })
}
function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length] })
    }
    newSegments = 0
}
function randomFood() {
    let newFood
    while (newFood == null || snakeAte(newFood)) {
        newFood = randomGridPosition()
    }
    return newFood
}

function randomGridPosition() {
    return (
        {
            x: Math.floor(Math.random() * GRID_SIZE) + 1,
            y: Math.floor(Math.random() * GRID_SIZE)

        }
    )
}





function main(currentTime) {
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) { return }
    lastRenderTime = currentTime
    updateSnake()
    updateFood()
    drawSnake()
    drawFood()

}

window.requestAnimationFrame(main)

