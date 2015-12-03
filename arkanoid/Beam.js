/**
 * Created by khoramus on 02.12.2015.
 */

if(window.arkanoid == undefined) window.arkanoid = {};

window.arkanoid.Beam = function () {
    var VectorProcedures = window.arkanoid.VectorProcedures;
    var self = this;
    // Точка исхода луча
    this.startPoint;
    // Направление луча, заданное как объект Direction
    this.direction;


    this.isIntersectBrick = function(brick) {
        var x1 = brick.xCenterPosition - brick.width / 2;
        var x2 = brick.xCenterPosition + brick.width / 2;
        var y1 = brick.yCenterPosition - brick.height / 2;
        var y2 = brick.yCenterPosition + brick.height / 2;
        return  this.isIntersectVerticalSide(x1, y1, y2) ||
                this.isIntersectVerticalSide(x2, y1, y2) ||
                this.isIntersectHorizontalSide(y1, x1, x2)||
                this.isIntersectHorizontalSide(y2, x1, x2);
    }

    this.isIntersectVerticalSide = function isIntersectVerticalSide(x, y1, y2){
        if(y1>y2) {
            y1 = [y2, y2 = y1][0];
        }

        var xDistance = x - this.startPoint.x;
        // Вектор, который надо прибавить к startPoint, чтобы получить точку, лежащую на луче
        // с абсциссой равной x
        var vectorToAdd = this.direction.getUnionVector();
        // Будем считать что при вертикальном направлении луча, сторона лучом не
        // пересекается
        if((vectorToAdd.i == 0)&&(Math.abs(vectorToAdd.j)==1)) {
            return false;
        }
        // Если xDistance и координата x направления луча разных знаков, то это следствие того, что
        // Луч и прямая, на которой лежит вертикальная сторона кирпича, не пересекаются
        if(xDistance * vectorToAdd.i < 0) {
            return false;
        }
        VectorProcedures.increaseLength(vectorToAdd, xDistance / vectorToAdd.i);

        // Ордината  точки на луче с абсциссой x
        var intersectionY = this.startPoint.y + vectorToAdd.j;
        return  (intersectionY >= y1)&&(intersectionY <=y2);
    }
    this.isIntersectHorizontalSide = function (y, x1, x2){
        if(x1>x2){
            x1 = [x2, x2=x1][0];
        }

        var yDistance = y- this.startPoint.y;
        // Вектор, который надо прибавить к startPoint, чтобы получить точку, лежащую на луче
        // с ординатой равной y
        var vectorToAdd = this.direction.getUnionVector();
        // Будем считать что при горизонтальном направлении луча, сторона лучом не
        // пересекается
        if((Math.abs(vectorToAdd.i)==1)&&(vectorToAdd.j == 0)) {
            return false;
        }
        //Если yDistance и координата y направления луча разных знаков, то это следствие того, что
        // Луч и прямая, на которой лежит горизонтальная сторона кирпича, не пересекаются
        if(yDistance * vectorToAdd.j < 0){
            return false;
        }
        VectorProcedures.increaseLength(vectorToAdd, yDistance / vectorToAdd.j);
        //Абсцисса точки на луче с координатой y
        var intersectionX = this.startPoint.x + vectorToAdd.i;

        return ((intersectionX >= x1)&&(intersectionX <= x2));

    }


}
