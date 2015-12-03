/**
 * Created by khoramus on 26.11.2015.
 */
if(window.arkanoid == undefined) window.arkanoid = {};
// Конструктор объекта, представляющий собой платформа, Puddle, которая отбивает шар
window.arkanoid.Puddle = function(){
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
    // Сдвиг Puddle влево. Принимает число секунд прошедшее с последнего
    // момента отрисовки
    this.shiftLeft = function(secondsElapsed){
        if((this.xCenterPosition - this.length / 2) > 0){
            this.xCenterPosition -= secondsElapsed * this.velocity;
        }
    };
    // Сдвиг Puddle вправо. Принимает число секунд прошедшее с последнего
    // момента отрисовки
    this.shiftRight = function(secondsElapsed){
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


// Задаёт Puddle со стандартными параметрами
// Принимает объект GameField
window.arkanoid.Puddle.createDefault = function(gameField){
    var defaultPuddle = new window.arkanoid.Puddle();
    defaultPuddle.length = 100;
    defaultPuddle.height = 15;
    defaultPuddle.color = new window.arkanoid.Color(255,0,0);
    defaultPuddle.velocity = 280;
    defaultPuddle.xCenterPosition = gameField.width / 2;
    defaultPuddle.yCenterPosition = gameField.height -20;
    defaultPuddle.gameField = gameField;

    return defaultPuddle;
};
