/**
 * Created by khoramus on 26.11.2015.
 */
if(window.arkanoid == undefined) window.arkanoid = {};
(function () {
    var WIDTH = 800;
    var HEIGHT = 600;

    var canvas = document.querySelector("#mainCanvas");
    var context = canvas.getContext("2d");
    var isLeftButtonPressed = false;
    var isRightButtonPressed = false;

    var testGameField = new window.arkanoid.GameField();
    testGameField.width = WIDTH;
    testGameField.height = HEIGHT;
    testGameField.canvasContext = context;

    var brickColors = [
        new window.arkanoid.Color(255,0,0),
        new window.arkanoid.Color(0,255,0),
        new window.arkanoid.Color(0,0,255),
        new window.arkanoid.Color(128,128,128),
    ];
    var testBrick = new window.arkanoid.Brick();
    testBrick.width = 80;
    testBrick.height = 40;
    testBrick.colors = brickColors;
    testBrick.xCenterPosition = WIDTH /2;
    testBrick.yCenterPosition = HEIGHT/2;
    testBrick.hitPoints =4;
    testBrick.gameField = testGameField;
    var bricks = [testBrick];


    testGameField.bricks =bricks;
    testGameField.ball = window.arkanoid.Ball.createDefault(testGameField);
    testGameField.paddle = window.arkanoid.Paddle.createDefault(testGameField);
    testGameField.deadHeight = testGameField.paddle.height/2+testGameField.paddle.yCenterPosition;


    var puddle = window.arkanoid.Paddle.createDefault(context);
    var lastTime = 0;

    requestAnimationFrame(function redraw(timeStamp) {
        context.clearRect(0, 0, WIDTH, HEIGHT);
        var deltaTime = (timeStamp - lastTime) / 1000;
        lastTime = timeStamp;
        testGameField.move(isLeftButtonPressed, isRightButtonPressed, deltaTime);
        testGameField.draw();

        requestAnimationFrame(redraw);

    });
    window.onkeydown = function (event) {
        var pressedKey = event.keyCode;
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
    /*
     window.onkeyup = function(event){
     xVelocity=0;
     };*/

})();

























































