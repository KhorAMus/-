/**
 * Created by khoramus on 18.12.2015.
 */
if(window.arkanoid == undefined) window.arkanoid = {};
window.arkanoid.Game = function Game() {



    var self = this;
    var canvas = document.querySelector("#mainCanvas");
    var context = canvas.getContext("2d");
    var isGameOver = false;
    this.score = 0;
    this.lifes = 2;
    this.gameField = new window.arkanoid.GameField(self);

    // определяет уровень сложности
    this.level = 0;

    var WIDTH = 800;
    var HEIGHT = 600;
    var isLeftButtonPressed = false;
    var isRightButtonPressed = false;
    window.onkeydown = function (event) {
        var pressedKey = event.keyCode;
        self.gameField.isStartState = false;
        switch (pressedKey) {
            case 65:
                isLeftButtonPressed = true;
                isRightButtonPressed = false;
                break;
            case 68:
                isLeftButtonPressed = false;
                isRightButtonPressed = true;
                break;
            case 37:
                isLeftButtonPressed = true;
                isRightButtonPressed = false;
                break;
            case 39:
                isLeftButtonPressed = false;
                isRightButtonPressed = true;
                break;
        }
    };
    function initGameField() {
        self.gameField.paddle = createPaddle();
        self.gameField.ball = createBall();
        self.gameField.bricks= createBricks();
        self.gameField.height = HEIGHT;
        self.gameField.width = WIDTH;
        self.gameField.isStartState=true;
        self.gameField.deadHeight = self.gameField.paddle.height/2+self.gameField.paddle.yCenterPosition;
        self.gameField.canvasContext = context;
    }

    function createPaddle() {
        var paddle = new window.arkanoid.Paddle();
        paddle.xCenterPosition = WIDTH / 2;
        paddle.yCenterPosition = HEIGHT - 40;
        paddle.length = 120;
        paddle.height = 15;
        paddle.color = new window.arkanoid.Color(255,0,0);
        paddle.velocity = 190 + 9 * self.level;
        paddle.gameField = self.gameField;
        return paddle;
    }

    function createBall() {
        var ball = new window.arkanoid.Ball(self.gameField);
        ball.xCenterPosition = self.gameField.paddle.xCenterPosition;

        ball.radius = 10;
        ball.yCenterPosition = self.gameField.paddle.yCenterPosition - self.gameField.paddle.height/2 - 1
        - ball.radius;
        ball.direction = new window.arkanoid.Direction({i: 1, j: - 1});
        ball.color = new window.arkanoid.Color(200,200,200);
        ball.velocity = 200 + 10 * self.level;

        return ball;
    }
    var bricksFigures = [createBricksFigure1(), createBricksFigureI(), createBricksFigureN(), createBricksFigureF(),
        createBricksFigureO()];
    function createBricks() {
        var brickColors = [
            new window.arkanoid.Color(255,30,120),
            new window.arkanoid.Color(0,255,0),
            new window.arkanoid.Color(0,0,255),
            new window.arkanoid.Color(128,128,128),
        ];
        var bricks = bricksFigures[self.level % bricksFigures.length];
        for(var i =0; i < bricks.length; i++){
            var hitPoints = Math.floor(Math.random()+0.5 + self.level);
            if (hitPoints<1){
                hitPoints=1;
            }
            if(hitPoints > brickColors.length){
                hitPoints = brickColors.length;
            }

            bricks[i].hitPoints=hitPoints;
            bricks[i].colors=brickColors;
        }
        return bricks;
    }

    function createBricksFigure1() {
        var bricksFigures = [];
        for (var y = 425; y >=125; y-= 100) {
            for (var x = 100; x<= 550; x+=150) {
                var brick = new window.arkanoid.Brick(self.gameField);
                brick.xCenterPosition = x;
                brick.yCenterPosition = y;
                bricksFigures.push(brick);
            }
        }
        return bricksFigures;
    }

    function createBricksFigureI(){
        var bricksFigures = [];
        for (var x = 125; x <= 625; x+= 500){
            for(var y = 400; y >= 100; y-=100){
                var brick = new window.arkanoid.Brick(self.gameField);
                brick.xCenterPosition = x;
                brick.yCenterPosition = y;
                brick.width = 40;
                brick.height = 80;
                bricksFigures.push(brick);
            }
        }
        for (var x =200; x<=550;x+=50){
            y=625 - x;
            brick = new window.arkanoid.Brick(self.gameField);
            brick.xCenterPosition = x;
            brick.yCenterPosition = y;
            bricksFigures.push(brick);
        }
        return bricksFigures;
    }

    function createBricksFigureN(){
        var bricksFigures = [];
        for (var x = 125; x <= 475; x+= 350){
            for(var y = 400; y >= 100; y-=100){
                brick = new window.arkanoid.Brick(self.gameField);
                brick.xCenterPosition = x;
                brick.yCenterPosition = y;
                brick.width = 40;
                brick.height = 80;
                bricksFigures.push(brick);
            }
        }
        for(var x=200; x<=400; x+=100){
            y=250;
            brick = new window.arkanoid.Brick(self.gameField);
            brick.xCenterPosition = x;
            brick.yCenterPosition = y;
            bricksFigures.push(brick);
        }
        return bricksFigures;
    }

    function createBricksFigureF(){
        var bricksFigures = [];
        for(var y =450; y>=50; y-=100){
            var x =400;
            var brick = new window.arkanoid.Brick(self.gameField);
            brick.xCenterPosition = x;
            brick.yCenterPosition = y;
            brick.width = 40;
            brick.height = 80;
            bricksFigures.push(brick);
        }
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 300;
        brick.yCenterPosition = 375;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 300;
        brick.yCenterPosition = 25;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 250;
        brick.yCenterPosition = 75;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 250;
        brick.yCenterPosition = 325;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 200;
        brick.yCenterPosition = 275;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 200;
        brick.yCenterPosition = 125;
        bricksFigures.push(brick);

        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 500;
        brick.yCenterPosition = 375;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 500;
        brick.yCenterPosition = 25;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 550;
        brick.yCenterPosition = 75;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 550;
        brick.yCenterPosition = 325;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 600;
        brick.yCenterPosition = 275;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 600;
        brick.yCenterPosition = 125;
        bricksFigures.push(brick);
        for(var x = 175; x <=625; x += 450) {
            var y =200;
            brick = new window.arkanoid.Brick(self.gameField);
            brick.xCenterPosition = x;
            brick.yCenterPosition = y;
            brick.width = 40;
            brick.height = 80;
            bricksFigures.push(brick);
        }
        return bricksFigures;

    }

    function createBricksFigureO(){
        var bricksFigures = [];
        var brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 300;
        brick.yCenterPosition = 375;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 300;
        brick.yCenterPosition = 25;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 250;
        brick.yCenterPosition = 75;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 250;
        brick.yCenterPosition = 325;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 200;
        brick.yCenterPosition = 275;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 200;
        brick.yCenterPosition = 125;
        bricksFigures.push(brick);

        var brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 500;
        brick.yCenterPosition = 375;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 500;
        brick.yCenterPosition = 25;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 550;
        brick.yCenterPosition = 75;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 550;
        brick.yCenterPosition = 325;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 600;
        brick.yCenterPosition = 275;
        bricksFigures.push(brick);
        brick = new window.arkanoid.Brick(self.gameField);
        brick.xCenterPosition = 600;
        brick.yCenterPosition = 125;
        bricksFigures.push(brick);
        for(var x = 175; x <=625; x += 450) {
            var y =200;
            var brick = new window.arkanoid.Brick(self.gameField);
            brick.xCenterPosition = x;
            brick.yCenterPosition = y;
            brick.width = 40;
            brick.height = 80;
            bricksFigures.push(brick);
        }
        for(var y = 375; y >=20 ; y -=350){
            x=400;
            var brick = new window.arkanoid.Brick(self.gameField);
            brick.xCenterPosition = x;
            brick.yCenterPosition = y;
            bricksFigures.push(brick);
        }
        return bricksFigures;
    }





    var looseSound = new Audio("sounds/Loose.wav");
    function checkLifeDecreaseCondition(){
        var ball = self.gameField.ball;
        if(ball.yCenterPosition + ball.radius > self.gameField.deadHeight){
            self.lifes --;
            self.gameField.paddle.xCenterPosition = WIDTH / 2;
            ball.xCenterPosition = self.gameField.paddle.xCenterPosition;
            ball.yCenterPosition = self.gameField.paddle.yCenterPosition - self.gameField.paddle.height/2 - 1
                - ball.radius;
            ball.direction = new window.arkanoid.Direction({i:1, j:-1});
            self.gameField.isStartState=true;
            isLeftButtonPressed = isRightButtonPressed =false;
            looseSound.play();
        }
    }

    function checkLooseCondition(){
        if(self.lifes <0){
            isGameOver = true;
        }
    }

    function checkLevelCompletenessConditions() {
        if(self.gameField.bricks.length ==0){
            self.level++;
            initGameField();
            isLeftButtonPressed = isRightButtonPressed = false;
        }


    }

    function checkConditions() {
        checkLifeDecreaseCondition();
        checkLooseCondition();
        checkLevelCompletenessConditions();
    }

    function drawStatistics() {
        context.fillStyle = (new window.arkanoid.Color(0,0,0)).toString();
        context.font = "15px Arial";
        context.fillText("SCORE: " + self.score + " LIFES: " + self.lifes ,10,HEIGHT - 15);
    }

    var lastTime =0;
    this.run = function run(){
        initGameField();
        requestAnimationFrame(function redraw(timeStamp) {
            context.clearRect(0, 0, WIDTH, HEIGHT);
            if (isGameOver){
                context.fillStyle = (new window.arkanoid.Color(255,0,0)).toString();
                context.font = "50px Times new roman";
                context.fillText("Вы проиграли!", 200, 120);
                context.fillText("Результат: " + self.score, 200, 200);
            }
            else {
                var deltaTime = (timeStamp - lastTime) / 1000;
                lastTime = timeStamp;
                checkConditions();
                self.gameField.move(isLeftButtonPressed, isRightButtonPressed, deltaTime);
                self.gameField.draw();
                drawStatistics();
            }
            requestAnimationFrame(redraw);
        });
    }
}