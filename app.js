const urnContainer = document.querySelector('.urn');
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
  }

  class Ball {

    constructor(x, y, color,colorName, border, size) {
       this.x = x;
       this.y = y;
       this.color = color;
       this.colorName = colorName;
       this.border = border;
    }

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

 const highlightBalls = function(isColor, colorName) {
    if(isColor){
        const ballsToHighlight = urnContainer.querySelectorAll(`.ball.${colorName}`);
    }else{
        const ballsToHighlight = urnContainer.querySelectorAll(`.ball:not(.${colorName})`);
    }

    for (ball in ballsToHighlight){
        ball.classList.toggle('highlight');
    }
    setTimeout(() => {
        for (ball in ballsToHighlight){
            ball.classList.toggle('highlight');
        }
    }, 5000);
 }
 balls = [];
 let size = 20;


// let ball = new Ball(
//     // ball position always drawn at least one ball width
//     // away from the edge of the canvas, to avoid drawing errors
//     15,
//     280,
//     '#333',
//     'red',
//     true
//  );
//  balls.push(ball);
//      ball = new Ball(
//      // ball position always drawn at least one ball width
//      // away from the edge of the canvas, to avoid drawing errors
//      3,
//      266,
//      '#333',
//      'red',
//      true
//   );
 
//   balls.push(ball);
//      ball = new Ball(
//      // ball position always drawn at least one ball width
//      // away from the edge of the canvas, to avoid drawing errors
//      3,
//      266,
//      '#333',
//      'red',
//      true
//   );
 

let yPos = 0,
    i=0,
    x=17,
    y=278;
while(balls.length<100){
    if(yPos === 0){
        ball = new Ball(
        x,
        y,
        '#333',
        'red',
        true
    );
    x+=size+2;
    if(x>220){
        yPos += 1; 
    }
    balls.push(ball);
}else if(yPos === 1 && y===278){
    y-=size;
    x=2;
    ball = new Ball(
        x,
        y,
        '#333',
        'red',
        true
    );
    balls.push(ball);
}else if(yPos === 1 && y!=278){
    x+=size+2;
    ball = new Ball(
        x,
        y,
        '#333',
        'red',
        true
    );
    balls.push(ball);
    if(x>=220){
        yPos +=1;
    }
}else if(yPos === 2 && y===258){
    y-=size;
    x=0;
    ball = new Ball(
        x,
        y,
        '#333',
        'red',
        true
    );
    balls.push(ball);
}
else if(yPos >= 2 && y!=258){
        if(x>=220){
        yPos +=1;
        y-=size+1;
        x=0;

    }else{
        x+=size+3;
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

function loop() {
   for (const ball of balls) {
     ball.draw();
   }
}

loop();

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
const allBalls = document.querySelectorAll('.ball'),
    numberOfColors = allColors.length;


const getColor = function(){
    let colorToAdd = allColors[Math.floor(Math.random() * numberOfColors)];
    while(colorToAdd.number>=(100/numberOfColors)){
        colorToAdd = allColors[Math.floor(Math.random() * numberOfColors)];
    }
    colorToAdd.number = `${parseInt(colorToAdd.number)+1}`;
    return colorToAdd;
}


allBalls.forEach(ball =>{
    ball.classList.remove('uncolored');
    let colorToAdd = getColor();
    ball.style.background = `${colorToAdd.color}`;
    ball.classList.add(`${colorToAdd.color}`);

})