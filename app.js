const urnContainer = document.querySelector('.urn');

//Ball Object
  class Ball {

    constructor(x, y, color,colorName, border, size) {
       this.x = x;
       this.y = y;
       this.color = color;
       this.colorName = colorName;
       this.border = border;
    }
    //Function to "draw" the ball using the details it's object has
    draw() {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.style.left = this.x + 'px';
        ball.style.top = this.y + 'px';
        if(this.border){
            ball.classList.add('uncolored');
        }else{
            ball.classList.add(this.colorName);
            ball.style.background = this.color; 
        }
        urnContainer.appendChild(ball);
      }
 }

 //A sort of flag to know that the balls are already highlighted, in order to prevent multiple calls to the highlighting function
 let ballsHighlighted = false;
 const highlightBalls = function(isColor, colorName) {
     //If already highlighted, break out
     if(ballsHighlighted){
        return;
     }
     ballsHighlighted = true;

    let ballsToHighlight,
    className;

    //Highlight the balls with the specified color 
    if(isColor){
        ballsToHighlight = urnContainer.querySelectorAll(`.ball.${colorName}`);
        className = 'highlighted'
    //Highlight the balls that are NOT of the specified color
    }else{
        ballsToHighlight = urnContainer.querySelectorAll(`.ball:not(.${colorName})`);
        className = 'highlightedAll'
    }

    for (var i =0;i<ballsToHighlight.length; i++){
        ballsToHighlight[i].classList.toggle(`${className}`);
    }

    //Unhighlight after 2 seconds
    setTimeout(() => {
        for (var i=0;i<ballsToHighlight.length; i++){
            ballsToHighlight[i].classList.toggle(`${className}`);
        }
        ballsHighlighted = false;
    }, 2000);
 }

 //Balls array, used to later draw each ball object within
balls = [];

let size = 20,
    yPos = 0,
    i=0,
    x=17,
    y=278,
    increment = 5;

while(balls.length<100){
    //First row of balls is unique, in order to account for the curved section of the jar
    if(yPos === 0){
        ball = new Ball(
        x,
        y,
        '#333',
        'red',
        true
    );
    x+=size+2;
    //If reached the end of the first row(right side of the jar), go to the next row
    if(x>220){
        yPos += 1; 
    }
    balls.push(ball);
}
//All other rows
else if(yPos >= 1){
    if(x>=220){
        yPos +=1;
        y-=size+2;
        x=0;
    }else{
        x+=size+increment;
    }
    ball = new Ball(
        x,
        y,
        '#333',
        'red',
        true
    );
    balls.push(ball);

}

}



//Array containing possible colors,and the number of balls already colored with that given color
const allColors = [
    {
        color: 'red',
        number: 0
    },
    {
        color: 'blue',
        number: 0
    },
    {
        color: 'green',
        number: 0
    },
    {
        color: 'wheat',
        number: 0
    },
    {
        color: 'black',
        number: 0
    },
    {
        color: 'aliceblue',
        number: 0
    },
    {
        color: 'aqua',
        number: 0
    },
    {
        color: 'aquamarine',
        number: 0
    },
    {
        color: 'rebeccapurple',
        number: 0
    },
    {
        color: 'salmon',
        number: 0
    }
];

//Loop through each ball object in the 'balls' array, in order to "draw" each of them
function loop() {
    for (const ball of balls) {
      ball.draw();
    }
 }
 
 //Call to drawing functions
 loop();


const allBalls = document.querySelectorAll('.ball'),
    numberOfColors = allColors.length;


    //Function used in order to get a random color from the array, making sure that the number of balls of the returned color has not already surpassed 
    // the possible maximum
const getRandomColor = function(){
    let colorToAdd = allColors[Math.floor(Math.random() * numberOfColors)];
    while(colorToAdd.number>=(100/numberOfColors)){
        colorToAdd = allColors[Math.floor(Math.random() * numberOfColors)];
    }
    colorToAdd.number = `${parseInt(colorToAdd.number)+1}`;
    return colorToAdd;
}


//Function used to get consecutive colors, in case on wants to fill each row with the same color
//The colors of each row are still randomized
let colorIndex =Math.floor(Math.random() * numberOfColors),
    colorToAdd = allColors[colorIndex];
const getConsecutiveColors = function(){
    if(colorToAdd.number>=100/numberOfColors){
        colorIndex = Math.floor(Math.random() * numberOfColors);
        colorToAdd = allColors[colorIndex];
        while(colorToAdd.number>=(100/numberOfColors)){
            colorIndex = Math.floor(Math.random() * numberOfColors)
            colorToAdd = allColors[colorIndex];
        }
    }
    colorToAdd.number = `${parseInt(colorToAdd.number)+1}`;
    return colorToAdd;
}



allBalls.forEach(ball =>{
    ball.classList.remove('uncolored');
    //If you want random colors, use the following line of code
    // let colorToAdd = getRandomColor();

    //Else:
    let colorToAdd = getConsecutiveColors();
    ball.style.background = `${colorToAdd.color}`;
    ball.classList.add(`${colorToAdd.color}`);

})

//Set left column rows positions
let leftColumnRows = document.querySelectorAll('.row'),
    colorBefore ='blank';
for(let i = leftColumnRows.length-1;i>=0;i--){
    leftColumnRows[i].style.top = `${allBalls[i*10].style.top}`;
    if(allBalls[i*10].style.background != '' && colorBefore != allBalls[i*10].style.background){
        leftColumnRows[i].innerText = `${document.querySelectorAll('.' + allBalls[i*10].style.background).length} ${allBalls[i*10].style.background} balls`;
        colorBefore = allBalls[i*10].style.background;
    }
}


//test scenarios of highlighting

document.querySelector('#highlight-red').addEventListener('click', (e)=>{
    e.preventDefault();
    highlightBalls(true, 'red');
});

document.querySelector('#highlight-blue').addEventListener('click', (e)=>{
    e.preventDefault();
    highlightBalls(true, 'blue');
});

document.querySelector('#highlight-but-blue').addEventListener('click', (e)=>{
    e.preventDefault();
    highlightBalls(false, 'blue');
})





