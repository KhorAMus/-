/**
 * Created by khoramus on 26.11.2015.
 */
if(window.arkanoid == undefined) window.arkanoid = {};
// Конструктор объекта, представляющий собой платформу, Paddle, которая отбивает шар
window.arkanoid.Paddle = function(){
    var self = this;
    this.length;
    this.height;
    this.color; // color specified by window.arkanoid.Color
    this.velocity; //speed in pixels per second.
    this.xCenterPosition;
    this.yCenterPosition;
    this.gameField;
    this.draw = function draw(){

        var leftUpCornerX = this.xCenterPosition - this.length/2;
        var leftUpCornerY = this.yCenterPosition - this.height/2;
        this.gameField.canvasContext.fillStyle=this.color.toString();
        this.gameField.canvasContext.fillRect(leftUpCornerX, leftUpCornerY, this.length, this.height);
    };
    // Сдвиг Paddle влево. Принимает число секунд прошедшее с последнего
    // момента отрисовки
    this.shiftLeft = function shiftLeft(secondsElapsed){
        if((this.xCenterPosition - this.length / 2) > 0){
            this.xCenterPosition -= secondsElapsed * this.velocity;
        }
    };
    // Сдвиг Paddle вправо. Принимает число секунд прошедшее с последнего
    // момента отрисовки
    this.shiftRight = function shiftRight(secondsElapsed){
        if((this.xCenterPosition + this.length / 2) < this.gameField.width){
            this.xCenterPosition += secondsElapsed * this.velocity;
        }

    };


    this.collideResolve = function(xCollideCoordinate){
        var relativeXCollideCoordinate = xCollideCoordinate - this.xCenterPosition;
        if((relativeXCollideCoordinate <=  - this.length/2)||
        (relativeXCollideCoordinate >= this.length/2)){
            return null;
        }
        var leftNormalAngle = 2.9671;
        var rightNormalAngle = 0.1745;
        // равна 1 если попал в самый правый край и 0 в противном случае.
        var relativeFromLeftToCollide = (this.length/2 + relativeXCollideCoordinate) / this.length;
        var relativeFromRightToCollide = 1-relativeFromLeftToCollide;
        return relativeFromLeftToCollide * rightNormalAngle + relativeFromRightToCollide * leftNormalAngle;
    }


};


// Задаёт Paddle со стандартными параметрами
// Принимает объект GameField
window.arkanoid.Paddle.createDefault = function createDefaultPaddle(gameField){
    var defaultPaddle = new window.arkanoid.Paddle();
    defaultPaddle.length = 100;
    defaultPaddle.height = 15;
    defaultPaddle.color = new window.arkanoid.Color(255,0,0);
    defaultPaddle.velocity = 280;
    defaultPaddle.xCenterPosition = gameField.width / 2;
    defaultPaddle.yCenterPosition = gameField.height -20;
    defaultPaddle.gameField = gameField;

    return defaultPaddle;
};
