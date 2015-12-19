/**
 * Created by khoramus on 26.11.2015.
 */
if(window.arkanoid == undefined) window.arkanoid = {};

window.arkanoid.Brick = function(gameField){
    this.width=80;
    this.height=40;
    var self = this;

    //При уменьшении параметра hitPoints цвет кирпича будет меняться
    //с Colors[hitPoints - 1] до Colors[0];
    this.colors = [new window.arkanoid.Color(255,0,255)]; // colors specified by window.arkanoid.Color[]
    this.xCenterPosition = 100;
    this.yCenterPosition = 100;
    this.gameField = gameField;
    this.hitPoints = 1; // Сколько раз шар должен ударить по кирпичу, чтобы тот разбился
    this.draw = function draw(){
        var leftUpCornerX = this.xCenterPosition - this.width/2;
        var leftUpCornerY = this.yCenterPosition - this.height/2;
        this.gameField.canvasContext.fillStyle=this.colors[this.hitPoints-1].toString();
        this.gameField.canvasContext.fillRect(leftUpCornerX, leftUpCornerY, this.width, this.height);
    };


};
