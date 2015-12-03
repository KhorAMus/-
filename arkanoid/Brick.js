/**
 * Created by khoramus on 26.11.2015.
 */
if(window.arkanoid == undefined) window.arkanoid = {};

window.arkanoid.Brick = function(){
    this.width;
    this.height;
    var self = this;

    //При уменьшении параметра hitPoints цвет кирпича будет меняться
    //с Colors[hitPoints - 1] до Colors[0];
    this.colors; // colors specified by window.arkanoid.Color[]
    this.xCenterPosition;
    this.yCenterPosition;
    this.gameField;
    this.hitPoints; // Сколько раз шар должен ударить по кирпичу, чтобы тот разбился
    this.draw = function draw(){
        var leftUpCornerX = this.xCenterPosition - this.width/2;
        var leftUpCornerY = this.yCenterPosition - this.height/2;
        this.gameField.canvasContext.fillStyle=this.colors[this.hitPoints-1].toString();
        this.gameField.canvasContext.fillRect(leftUpCornerX, leftUpCornerY, this.width, this.height);
    };

};