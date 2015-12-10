/**
 * Created by khoramus on 28.11.2015.
 */
if(window.arkanoid == undefined) window.arkanoid = {};
window.arkanoid.GameField = function(){
    // height и width определяют границы за которые не может вылететь шар
    this.height;
    this.width;
    var self = this;
    // Если координата y шара > deadHeight, то теряется одна жизнь
    this.deadHeight;
    this.canvasContext;
    // Объект типа Array, содержащий кирпичи на игровом поле
    this.bricks;
    // Шар на поле
    this.ball;
    // Платформа на поле
    this.paddle;

    this.draw = function(){
        this.canvasContext.clearRect(0, 0, this.width, this.height);
        this.bricks.forEach(function(brick, i) {
            brick.draw();
        });
        this.ball.draw();
        this.paddle.draw();
        drawBorders();
    };
    function drawBorders(){
        self.canvasContext.beginPath();
        self.canvasContext.moveTo(1,1);
        self.canvasContext.lineTo(self.width-1, 1);
        self.canvasContext.lineTo(self.width-1, self.deadHeight-1);
        self.canvasContext.lineTo(1, self.deadHeight);
        self.canvasContext.lineTo(1,1);
        self.canvasContext.strokeStyle = "rgb(0,255,0)";
        self.canvasContext.stroke();

    }


    this.move = function(isLeftButtonPressed, isRightButtonPressed, secondsElapsed){
        if(isLeftButtonPressed){
            this.paddle.shiftLeft(secondsElapsed);
        }
        if(isRightButtonPressed){
            this.paddle.shiftRight(secondsElapsed);
        }
        this.ball.move(secondsElapsed);
    }
};