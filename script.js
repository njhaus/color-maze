// TO FIX:
// TO DO:
// 1. High Scores -- Stop timer on game win/lose.
// 2. background color 'blasts'
// 3. Mobile friendly



// MAZE CREATOR

// maze variables
let colors = ['red', 'yellow', 'blue'];
let colorSquares = Array.from(document.getElementsByClassName('color-square'));
let pathColor = document.getElementById('path-color');
let restartColor = document.getElementById('restart-color'); 
let avoidColor = document.getElementById('avoid-color'); 
let infoColors = [pathColor, restartColor, avoidColor];
let blankSquares = Array.from(document.getElementsByClassName('blank-square'));

let colorInfo = [];
let getColors =[...colors]

// Move character variables
let character = document.getElementById('character');
let charTop = 0;
let charLeft = 0;

// timer variables

// timer function
let hoursNum = 0;
let minutesNum = 0;
let secondsNum = 0;
let currentTime = hoursNum.toString() + minutesNum.toString() + secondsNum.toString();


// dialog variables

let message = document.getElementById('message-dialog');
let messageText = document.getElementById('message-text');
let messageTextSmall = document.getElementById('message-text-small');
let messageImg = document.getElementById('message-img');
let closeDialog = document.getElementById('close-dialog');
let restartMaze = document.getElementById('restart-maze');

let howToPlayIcon = document.getElementById('how-to-play-icon');
let howToPlayDialog = document.getElementById('how-to-play-dialog');
let howToPlayButton = document.getElementById('how-to-play-button');

let highScoreForm = document.getElementById('high-score-form');
let highScoreInput = document.getElementById('high-score-input');
let highScoreSubmit = document.getElementById('high-score-submit');

let highScoresList = document.getElementById('high-scores-list');
let highScoresListItems = Array.from(highScoresList.children);

let highScoresIcon = document.getElementById('high-scores-icon');
let highScoresDialog = document.getElementById('high-scores-dialog');
let highScoresButton = document.getElementById('high-scores-button');

let highScores = JSON.parse(localStorage.getItem('highScores'));


// MAZE GRID VARIABLES


let rowA = Array.from(document.getElementById('row-a').children);
let rowB = Array.from(document.getElementById('row-b').children);
let rowC = Array.from(document.getElementById('row-c').children);
let rowD = Array.from(document.getElementById('row-d').children);
let rowE = Array.from(document.getElementById('row-e').children);
let rowF = Array.from(document.getElementById('row-f').children);
let rowH = Array.from(document.getElementById('row-h').children);
let rowI = Array.from(document.getElementById('row-i').children);
let rowJ = Array.from(document.getElementById('row-j').children);
let rowK = Array.from(document.getElementById('row-k').children);
let rowL = Array.from(document.getElementById('row-l').children);
let rowN = Array.from(document.getElementById('row-n').children);


let mazeGrid = [rowA, rowB, rowC, rowD, rowE, rowF, rowH, rowI, rowJ, rowK, rowL, rowN];


// POWERUP VARIABLES


let horizontalPowerup = document.getElementById('horizontal-powerup');
let horizontalRemaining = document.getElementById('horizontal-powerup-remaining');
let verticalPowerup = document.getElementById('vertical-powerup');
let verticalRemaining = document.getElementById('vertical-powerup-remaining');
let squareChange = document.getElementById('sq-change');
let squareChangeRemaining = document.getElementById('sq-change-remaining');
let colorSwitch = document.getElementById('color-switch');
let colorSwitchRemaining = document.getElementById('color-switch-remaining');
let powerups = [horizontalPowerup, verticalPowerup, squareChange, colorSwitch];


// maze setup onload/restart
// Create maze and start timer onLoad
window.addEventListener('load', (openPage));
window.setInterval(timer, 1000);

function openPage() {
    createMaze();
    populateHighScores();
}

function createMaze() {
    // reset character, timer, powerups, dialog
    charTop = 0;
    charLeft = 0;
    character.style.transform = `translate(0px, 0px) `;
    horizontalRemaining.innerText = '2';
    verticalRemaining.innerText = '2';
    squareChangeRemaining.innerText = '4';
    colorSwitchRemaining.innerText = '1';
    secondsNum = 0;
    minutesNum = 0;
    hoursNum = 0;
    messageTextSmall.innerText = '';
    // remake color randomizer 
    colorInfo = [];
    getColors =[...colors];
    // Remove old colors for path/avoid/restart
    pathColor.classList.remove('red', 'yellow', 'blue');
    restartColor.classList.remove('red', 'yellow', 'blue');
    avoidColor.classList.remove('red', 'yellow', 'blue');
     // remove old colors if the player just lost/ won
     infoColors.forEach(color => color.classList.remove('red', 'yellow', 'blue'));
     colorSquares.forEach(color => color.classList.remove('red', 'yellow', 'blue'));
     colorSquares.forEach(square => square.classList.add(colors[Math.floor(Math.random() * colors.length)]));
    // reset powerups
    powerups.forEach(powerup => powerup.disabled = false);
     //hide squares
     blankSquares.forEach(space => space.classList.remove('hidden'));
     blankSquares.forEach(space => space.classList.remove('adjacent', 'adjacent-o', 'adjacent-v', 'adjacent-g'));
     // Choose colors
        for (let i = getColors.length; i > 0; i--) {
            let chooseColor = Math.floor(Math.random() * i);
            colorInfo.push(getColors[chooseColor]);
            getColors.splice(chooseColor, 1);
        }
        pathColor.classList.add(colorInfo[0]);
        restartColor.classList.add(colorInfo[1]);
        avoidColor.classList.add(colorInfo[2]);
 
}

    // Timer Function
function timer() {
    let hours = document.getElementById('hours');
    let minutes = document.getElementById('minutes');
    let seconds = document.getElementById('seconds');

    if (secondsNum > 58) {
        secondsNum = 0;
        if (minutesNum > 58) {
            hoursNum++
            minutesNum = 0;
        }
        else {
            minutesNum++
        }
    }
    else {
       secondsNum++
    }

    hours.innerText = hoursNum < 10 ? ('0' + hoursNum.toString()) : hoursNum.toString();
    minutes.innerText = minutesNum < 10 ? ('0' + minutesNum.toString()) : minutesNum.toString();
    seconds.innerText = secondsNum < 10 ? ('0' + secondsNum.toString()) : secondsNum.toString();
    currentTime = hoursNum.toString() + minutesNum.toString() + secondsNum.toString();

}

// Populate High score list from local storage

function populateHighScores() { 
    for (let i=0; i < highScoresListItems.length; i++) {
        if (highScores[i]) {
            highScoresListItems[i].innerText = highScores[i].name + '  ' + highScores[i].time;
            highScoresListItems[i].classList.remove('hidden');
        }
    }
}


// DIALOGS
// dialog FUNCTIONS
closeDialog.addEventListener('click', ()=> {
    message.close();
})

// How to play modal 

howToPlayIcon.addEventListener('click', () => {
    howToPlayDialog.showModal();
})

howToPlayButton.addEventListener('click', () => {
    howToPlayDialog.close();
})

// High Scores modal function

highScoresIcon.addEventListener('click', () => {
    highScoresDialog.showModal();
})

highScoresButton.addEventListener('click', () => {
    highScoresDialog.close();
})

// high score object
function HighScoreObject(time, name, hoursNum, minutesNum, secondsNum) {
    let hours = hoursNum < 10 ? ('0' + hoursNum.toString()) : hoursNum.toString();
    let minutes = minutesNum < 10 ? ('0' + minutesNum.toString()) : minutesNum.toString();
    let seconds = secondsNum < 10 ? ('0' + secondsNum.toString()) : secondsNum.toString();
    this.time = hours + ':' + minutes + ":" + seconds;
    this.timeNumber = parseInt(time);
    this.name = name;
}

// add high score
highScoreSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    let highScore = new HighScoreObject(currentTime, highScoreInput.value, hoursNum, minutesNum, secondsNum);
    highScores.push(highScore);
    highScores.sort((a, b) => a.timeNumber - b.timeNumber);
    
    for (let i=0; i < highScoresListItems.length; i++) {
        if (highScores[i]) {
            highScoresListItems[i].innerText = highScores[i].name + '  ' + highScores[i].time;
            highScoresListItems[i].classList.remove('hidden');
        }
    }

    localStorage.setItem('highScores', JSON.stringify(highScores));    
    highScoreInput.value = '';
    highScoreForm.classList.add('display-none');
})




// MOVE CHARACTER

function moveChar(moveX, moveY) {
    let x = (moveX * 50) + (charLeft * 50);
    let y = (moveY * 50) + (charTop * 50);
    let transform = `translate(${x}px, ${y}px) `;
    // console.log('function call');

    if (((charLeft + moveX) > -1) &&
        ((charLeft + moveX) < 12) &&
        ((charTop + moveY) > -1) &&
        ((charTop + moveY) < 14)) {
        charLeft += moveX;
        charTop += moveY;
        // console.log('transfrom:', transform, 'charTop:', charTop, 'charLeft:', charLeft);
        character.style.transform = transform;
        // make white space disappear
        // wait a second OR do a transform
        mazeSpace();
    }
}

document.addEventListener('keydown', (e) => {
    if (message.getAttribute('open') === null 
        && howToPlayDialog.getAttribute('open') === null 
        && highScoresDialog.getAttribute('open') === null) {
        switch (e.code) {
            case 'ArrowUp':
            case 'KeyW':
                moveChar(0, -1);
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveChar(0, 1);
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveChar(-1, 0);
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveChar(1, 0);
                break;       
        }
    }
})

// position in maze arrays
// Lose and restart function
// reveal adjacent clues function

function mazeSpace() {
    let adjColorChooser = Math.floor(Math.random() * 2);
    let adjacentRed = ['adjacent-o', 'adjacent-v'];
    let adjacentBlue = ['adjacent-v', 'adjacent-g'];
    let adjacentYellow = ['adjacent-g', 'adjacent-o'];
    
    if (charTop === 0) {
        if (!mazeGrid[charTop][charLeft].firstElementChild.classList.contains('adjacent')){
            mazeGrid[charTop][charLeft].firstElementChild.classList.add('adjacent');
        switch(true) {
            case mazeGrid[charTop][charLeft].classList.contains('red'):
                mazeGrid[charTop][charLeft].firstElementChild.classList.add(adjacentRed[adjColorChooser]);
                break;
            case mazeGrid[charTop][charLeft].classList.contains('blue'):
                mazeGrid[charTop][charLeft].firstElementChild.classList.add(adjacentBlue[adjColorChooser]);
                break;
            case mazeGrid[charTop][charLeft].classList.contains('yellow'):
                mazeGrid[charTop][charLeft].firstElementChild.classList.add(adjacentYellow[adjColorChooser]);
                break;
                }
            }
        }      

        // you win!
        // WIN!
    else if (charTop === 13) {
        messageText.innerText = "You win!";
        messageTextSmall.innerText = "Your time was " + hoursNum + " hours, " + minutesNum + " minutes, " + secondsNum + " seconds. Play again?";
        
        if (highScores.length === 0) {
            {highScoreForm.classList.remove('display-none')}
        } 
        else if (currentTime < highScores[highScores.length - 1].time) {
            {highScoreForm.classList.remove('display-none')}
        }
        else {highScoreForm.classList.add('display-none')}

        messageImg.innerHTML = '';
        closeDialog.classList.add('display-none');
        restartMaze.classList.remove('display-none');
        
        message.showModal();
    }

    else {
        let mazeLocation = mazeGrid[charTop - 1][charLeft];
        mazeLocation.firstElementChild.classList.add('hidden');
        // below
        if (charTop < 12 && !mazeGrid[charTop][charLeft].firstElementChild.classList.contains('adjacent')) {
            mazeGrid[charTop][charLeft].firstElementChild.classList.add('adjacent');
            switch(true) {
                case mazeGrid[charTop][charLeft].classList.contains('red'):
                    mazeGrid[charTop][charLeft].firstElementChild.classList.add(adjacentRed[adjColorChooser]);
                    break;
                case mazeGrid[charTop][charLeft].classList.contains('blue'):
                    mazeGrid[charTop][charLeft].firstElementChild.classList.add(adjacentBlue[adjColorChooser]);
                    break;
                case mazeGrid[charTop][charLeft].classList.contains('yellow'):
                    mazeGrid[charTop][charLeft].firstElementChild.classList.add(adjacentYellow[adjColorChooser]);
                    break;
            }
        }
        // above
        if (charTop > 1 && !mazeGrid[charTop - 2][charLeft].firstElementChild.classList.contains('adjacent')) {
            mazeGrid[charTop - 2][charLeft].firstElementChild.classList.add('adjacent');
            switch(true) {
                case mazeGrid[charTop - 2][charLeft].classList.contains('red'):
                    mazeGrid[charTop - 2][charLeft].firstElementChild.classList.add(adjacentRed[adjColorChooser]);
                    break;
                case mazeGrid[charTop - 2][charLeft].classList.contains('blue'):
                    mazeGrid[charTop - 2][charLeft].firstElementChild.classList.add(adjacentBlue[adjColorChooser]);
                    break;
                case mazeGrid[charTop - 2][charLeft].classList.contains('yellow'):
                    mazeGrid[charTop - 2][charLeft].firstElementChild.classList.add(adjacentYellow[adjColorChooser]);
                    break;
                 }
            }
        // left
        if (charLeft > 0 && !mazeGrid[charTop - 1][charLeft -1].firstElementChild.classList.contains('adjacent')) {
            mazeGrid[charTop -1][charLeft -1].firstElementChild.classList.add('adjacent');
            switch(true) {
                case mazeGrid[charTop - 1][charLeft - 1].classList.contains('red'):
                    mazeGrid[charTop - 1][charLeft - 1].firstElementChild.classList.add(adjacentRed[adjColorChooser]);
                    break;
                case mazeGrid[charTop - 1][charLeft - 1].classList.contains('blue'):
                    mazeGrid[charTop - 1][charLeft - 1].firstElementChild.classList.add(adjacentBlue[adjColorChooser]);
                    break;
                case mazeGrid[charTop - 1][charLeft - 1].classList.contains('yellow'):
                    mazeGrid[charTop - 1][charLeft - 1].firstElementChild.classList.add(adjacentYellow[adjColorChooser]);
                    break;
                 }
         }
        // right
        if (charLeft < 11 && !mazeGrid[charTop - 1][charLeft + 1].firstElementChild.classList.contains('adjacent')) {
            mazeGrid[charTop -1][charLeft + 1].firstElementChild.classList.add('adjacent');
            switch(true) {
                case mazeGrid[charTop - 1][charLeft + 1].classList.contains('red'):
                    mazeGrid[charTop - 1][charLeft + 1].firstElementChild.classList.add(adjacentRed[adjColorChooser]);
                    break;
                case mazeGrid[charTop - 1][charLeft + 1].classList.contains('blue'):
                    mazeGrid[charTop - 1][charLeft + 1].firstElementChild.classList.add(adjacentBlue[adjColorChooser]);
                    break;
                case mazeGrid[charTop - 1][charLeft + 1].classList.contains('yellow'):
                    mazeGrid[charTop - 1][charLeft + 1].firstElementChild.classList.add(adjacentYellow[adjColorChooser]);
                    break;
                 }
        }

        //determines what happens on move (you win is above because it is based on mazespace)
        if (mazeLocation.classList.contains(restartColor.classList[1])) {
            charTop = 0;
            charLeft = 0;
            blankSquares.forEach(space => space.classList.remove('adjacent', 'adjacent-o', 'adjacent-v', 'adjacent-g'));
            character.style.transform = `translate(0px, 0px) `;
            messageText.innerText = "Restart!";
            messageImg.innerHTML = '';
            message.showModal();
        }
        else if (mazeLocation.classList.contains(avoidColor.classList[1])) {
            blankSquares.forEach(space => space.classList.add('hidden'));
            messageText.innerText = "Game over!";
            messageImg.innerHTML = '';
            closeDialog.classList.add('display-none');
            restartMaze.classList.remove('display-none');
            message.showModal();
        }
        else {
            return "You broke it."
        }
    }
}

// restart maze (In Dialog for lose)

restartMaze.addEventListener('click', () => {
    message.close();
    createMaze();
    closeDialog.classList.remove('display-none');
    restartMaze.classList.add('display-none');
    console.log('maze restarted');
})

// POWERUPS


//Horizontal powerup

horizontalPowerup.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    let target = e.target;
    powerups.filter(powerup => powerup != target).filter(powerup => powerup.checked === true).forEach(powerup => powerup.click());
    if (horizontalPowerup.checked && parseInt(horizontalRemaining.innerText) > 0) {
        blankSquares.forEach(square => square.addEventListener('click', horizontalHandler));
    }
    else if ((!horizontalPowerup.checked && parseInt(horizontalRemaining.innerText) > 0)) {
        blankSquares.forEach(square => square.removeEventListener('click', horizontalHandler));
    }
    else{
        horizontalPowerup.checked = false;
        console.log('no more!')}
})

function horizontalHandler(e) {
    let target = e.target;
    let squareRow = Math.floor(blankSquares.findIndex(square => square === target) / 12);
    blankSquares.filter(square => Math.floor(blankSquares.indexOf(square) /12) === squareRow)
        .forEach(square => square.classList.add('hidden'));
    blankSquares.forEach(square => square.removeEventListener('click', horizontalHandler));
    horizontalRemaining.innerText = (parseInt(horizontalRemaining.innerText) - 1);
    if (parseInt(horizontalRemaining.innerText) === 0) {horizontalPowerup.disabled = true;}
    horizontalPowerup.checked = false;
}

// Vertical Powerup

verticalPowerup.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    let target = e.target;
    powerups.filter(powerup => powerup != target).filter(powerup => powerup.checked === true).forEach(powerup => powerup.click());
    if (verticalPowerup.checked && parseInt(verticalRemaining.innerText) > 0) {
        blankSquares.forEach(square => square.addEventListener('click', verticalHandler));
    }
    else if ((!verticalPowerup.checked && parseInt(verticalRemaining.innerText) > 0)) {
        blankSquares.forEach(square => square.removeEventListener('click', verticalHandler));
    }
    else{
        verticalPowerup.checked = false;
        console.log('no more!')}
})

function verticalHandler(e) {
    let target = e.target;
    let column = blankSquares.indexOf(target);
    let columnSquares = [];

    while (column > 12) 
    {column -= 12}

    for (let i = column; i < blankSquares.length; i += 12) {
                columnSquares.push(blankSquares[i]);
            }
        columnSquares.forEach(square => square.classList.add('hidden'));
        blankSquares.forEach(square => square.removeEventListener('click', verticalHandler));
        verticalRemaining.innerText = (parseInt(verticalRemaining.innerText) - 1);
        if (parseInt(verticalRemaining.innerText) === 0) {verticalPowerup.disabled = true;}
        verticalPowerup.checked = false;
    }

    // Square switch powerup

    squareChange.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        let target = e.target;
        powerups.filter(powerup => powerup != target).filter(powerup => powerup.checked === true).forEach(powerup => powerup.click());
        if (squareChange.checked && parseInt(squareChangeRemaining.innerText) > 0) {
            blankSquares.forEach(square => square.addEventListener('click', squareChangeHandler));
        }
        else if ((!squareChange.checked && parseInt(squareChangeRemaining.innerText) > 0)) {
            blankSquares.forEach(square => square.removeEventListener('click', squareChangeHandler));
        }
        else{
            squareChange.checked = false;
            console.log('no more!')}
    })

function squareChangeHandler(e) {
    let target = e.target;
    let goodColor = pathColor.classList[1];
    let badColors = [restartColor.classList[1], avoidColor.classList[1]];
    
    target.classList.add('hidden');
    target.parentElement.classList.remove(badColors[0], badColors[1]);
    target.parentElement.classList.add(goodColor);
    
    blankSquares.forEach(square => square.removeEventListener('click', squareChangeHandler));
    squareChangeRemaining.innerText = (parseInt(squareChangeRemaining.innerText) - 1);
    if (parseInt(squareChangeRemaining.innerText) === 0) {squareChange.disabled = true;}
    squareChange.checked = false;
}

// Path change (color switch)

colorSwitch.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    let target = e.target;
    powerups.filter(powerup => powerup != target).filter(powerup => powerup.checked === true).forEach(powerup => powerup.click());
    if (colorSwitch.checked && parseInt(colorSwitchRemaining.innerText) > 0) {
        blankSquares.forEach(square => square.addEventListener('click', colorSwitchHandler));   
    }
    else if ((!colorSwitch.checked && parseInt(colorSwitchRemaining.innerText) > 0)) {
        blankSquares.forEach(square => square.removeEventListener('click', colorSwitchHandler));
    }
    else {
        colorSwitch.checked = false;
        console.log('no more!')}
})

function colorSwitchHandler(e) {
    let target = e.target;
    let parent = Array.from(target.parentElement.classList);
    let color = parent.find(color => color.match(/red|blue|yellow/));
    let removeColor = pathColor.classList[1];

    if (restartColor.classList[1] === color) { 
        restartColor.classList.remove(color);
        restartColor.classList.add(pathColor.classList[1]);
    }
    else if (avoidColor.classList[1] === color) {
        avoidColor.classList.remove(color);
        avoidColor.classList.add(pathColor.classList[1]);
    }
    pathColor.classList.remove(removeColor);
    pathColor.classList.add(color);

    blankSquares.forEach(square => square.removeEventListener('click', colorSwitchHandler));
    colorSwitchRemaining.innerText = (parseInt(colorSwitchRemaining.innerText) - 1);
    if (parseInt(colorSwitchRemaining.innerText) === 0) {colorSwitch.disabled = true;}
    colorSwitch.checked = false;

}
