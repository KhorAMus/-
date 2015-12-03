/**
 * Created by khoramus on 26.11.2015.
 */
if(window.arkanoid == undefined) window.arkanoid = {};
//Конструктор объекта, представляющего собой шар для разбивания кирпичей
window.arkanoid.Ball = function() {
    this.radius;

    this.direction; // Направление, заданное как объект Direction
    this.xCenterPosition;
    this.yCenterPosition;
    this.velocity;
    this.gameField;



    this.color; // color specified by window.arkanoid.Color
    this.draw = function draw(){
        this.gameField.canvasContext.fillStyle=this.color.toString();
        this.gameField.canvasContext.beginPath();
        this.gameField.canvasContext.arc(this.xCenterPosition,
            this.yCenterPosition, this.radius, 0, Math.PI*2);
        this.gameField.canvasContext.closePath();
        this.gameField.canvasContext.fill();

    };
    var self = this;
    this.move = function move(secondsElapsed){
        // Столкновение платформы и шара
        // При столкновении шар приобретает новое направление,
        // заданное в Puddle через функцию collideResolve. При этом шар игнорирует своё старое направление
        var puddleUpY =self.gameField.puddle.yCenterPosition - self.gameField.puddle.height/2;
        if (self.yCenterPosition + self.radius >= puddleUpY){ // Если шар по высоте находится на уровне платформы
            var newDirectionAngle = self.gameField.puddle.collideResolve(self.xCenterPosition);
            if(newDirectionAngle != null){
                var directionVector = {
                    i: Math.cos(newDirectionAngle),
                    j: -Math.sin(newDirectionAngle)
                };
                self.direction = new window.arkanoid.Direction(directionVector);
            }
        }
        else {
            var normal = collideResearch();
            if (normal != null) {
                var lastDirectionVectorInv = this.direction.getUnionVector();
                window.arkanoid.VectorProcedures.invert(lastDirectionVectorInv);
                var bx = 0;
                var by = 0;
                var ax = bx + lastDirectionVectorInv.i;
                var ay = by + lastDirectionVectorInv.j;
                var cosABH = window.arkanoid.VectorProcedures.calculateDot(lastDirectionVectorInv, normal) /
                    (window.arkanoid.VectorProcedures.getLength(lastDirectionVectorInv) *
                    window.arkanoid.VectorProcedures.getLength(normal));
                var bh = cosABH;
                window.arkanoid.VectorProcedures.setLength(normal, bh);
                var hx = bx + normal.i;
                var hy = by + normal.j;
                var acVector = {
                    'i': 2 * (hx - ax),
                    'j': 2 * (hy - ay)
                };
                var cx = ax + acVector.i;
                var cy = ay + acVector.j;
                var bc = {
                    'i': cx,
                    'j': cy
                };
                this.direction = new window.arkanoid.Direction(bc);

            }
        }
        coordinateResearch();
        this.xCenterPosition += secondsElapsed * this.velocity * this.direction.getUnionVector().i;
        this.yCenterPosition += secondsElapsed * this.velocity * this.direction.getUnionVector().j;

        console.log(this.direction.getUnionVector().i + " " + this.direction.getUnionVector().j);
    };
    function collideResearch(){
        var touchedBricksIndices = new Array(0);
        var bricks = self.gameField.bricks;
        var normalAngles = new Array(0);
        //Проверка, что соответствующий направлению шара луч
        //пересекает кирпич, или границу

        // введём три луча, сонаправленных направлению движению шара
        // Первый выходит из центра. второй и третий из самых левых и правых точек на окружности шара,
        // с точки зрения наблюдателя смотрящего по напрвлению движения шара
        var beamDirectionVector = self.direction.getUnionVector();
        var centerBeam = new window.arkanoid.Beam();
        centerBeam.startPoint = {"x": self.xCenterPosition, "y": self.yCenterPosition};
        var leftBeam = new window.arkanoid.Beam();
        var vectorAddToCenter = {
            'i': 1,
            'j': -beamDirectionVector.i / beamDirectionVector.j
        };
        window.arkanoid.VectorProcedures.setLength(vectorAddToCenter, self.radius);
        leftBeam.startPoint = {
            'x': self.xCenterPosition + vectorAddToCenter.i,
            'y': self.yCenterPosition + vectorAddToCenter.j
        };
        var rightBeam = new window.arkanoid.Beam();
        rightBeam.startPoint = {
            'x': self.xCenterPosition - vectorAddToCenter.i,
            'y': self.yCenterPosition - vectorAddToCenter.j
        };
        centerBeam.direction =new window.arkanoid.Direction( beamDirectionVector);
        rightBeam.direction =new window.arkanoid.Direction( beamDirectionVector);
        leftBeam.direction =new window.arkanoid.Direction(beamDirectionVector);
        var beams = [centerBeam, leftBeam, rightBeam];
        for(var i=0; i < bricks.length; i++){
            // проверка на пересечение лучами кирпича
            if(!(beams.some(function(beam){return beam.isIntersectBrick(bricks[i]);}))){
                continue;
            }
            // определим точки пересечения очередного кирпича с шаром
            var touchedPoints = new Array(0);
            // c вертикальными сторонами кирпича
            var verticalTouchedPoints = getVerticalIntersectionPoints(bricks[i]);
            verticalTouchedPoints.forEach(function (point){
                touchedPoints.push(point);
            });
            // c горизонтальными сторонами кирпича
            var horizontalTouchedPoints = getHorizontalIntersectionPoints(bricks[i]);
            horizontalTouchedPoints.forEach(function(point){
                touchedPoints.push(point);
            });
            if(touchedPoints.length > 0) {
                touchedBricksIndices.push(i);
            }
            // преобразуем touchedPoints в соответствующие углы
            for(var i1=0; i1 < touchedPoints.length; i1++){
                var relativePointX = touchedPoints[i1].x - self.xCenterPosition;
                var relativePointY = touchedPoints[i1].y - self.yCenterPosition;
                normalAngles.push(Math.acos(relativePointX/Math.sqrt(relativePointX*relativePointX+
                    relativePointY*relativePointY)));
                if(relativePointY < 0){
                    normalAngles[i1] = -normalAngles[i1] + 2 * Math.PI;
                }
            }
        }
        // TODO вызов метода увеличения очков (метод ещё не создан)
        hitBricks(touchedBricksIndices);
        // учтём точки пересечения шара и границ
        //правая сторона
        if (((self.xCenterPosition + self.radius) >= self.gameField.width)&&
        (beams.some(function(beam){return beam.isIntersectVerticalSide(self.gameField.width, 0, self.gameField.height);}))){
            normalAngles.push(Math.PI);
        }
        //левая сторона
        if (((self.xCenterPosition - self.radius) <= 0) &&
        (beams.some(function(beam){return beam.isIntersectVerticalSide(0, 0, self.gameField.height);}))){
            normalAngles.push(0);
        }
        //верхняя сторона
        if (((self.yCenterPosition - self.radius) <= 0) &&
        (beams.some(function(beam){return beam.isIntersectHorizontalSide(0, 0, self.gameField.width);}))){
            normalAngles.push(1.5*Math.PI);
        }
        // столкновение платформы и шара

        var puddleUpY =self.gameField.puddle.yCenterPosition - self.gameField.puddle.height/2;
        if (self.yCenterPosition + self.radius >= puddleUpY){
            var normalAngleToPuddle = self.gameField.puddle.collideResolve(self.xCenterPosition);
            if (normalAngleToPuddle != null){
                normalAngles.push(normalAngleToPuddle);
            }
        }

        if(normalAngles.length==0){
            return null;
        }
        var middleNormalAngle=0;
        for (var i2=0;i2<normalAngles.length;i2++){
            middleNormalAngle += normalAngles[i2];
        }
        middleNormalAngle/=normalAngles.length;
        //немного рандома
        // Плюс-минус пять градусов
        middleNormalAngle += Math.random() * Math.PI / 18 - Math.PI/36;
        return{
            'i': Math.cos(middleNormalAngle),
            'j': Math.sin(middleNormalAngle)
        };
    }
    function getVerticalIntersectionPoints(brick){

        var touchedPoints =new Array(0);
        var x1 = brick.xCenterPosition - brick.width/2;
        var x2 = brick.xCenterPosition + brick.width/2;
        var y1 = brick.yCenterPosition - brick.height/2;
        var y2 = brick.yCenterPosition + brick.height/2;
        var d1 = -x1*x1 + 2*x1*self.xCenterPosition-self.xCenterPosition*self.xCenterPosition +
            self.radius*self.radius;
        var root;
        if(d1>=0){
            root = self.yCenterPosition + Math.sqrt(d1);
            if((root >= y1)&&(root<=y2)){
                touchedPoints.push({'x': x1, 'y': root});
            }
            root = self.yCenterPosition - Math.sqrt(d1);
            if((root >= y1)&&(root<=y2)){
                touchedPoints.push({'x': x1, 'y': root});
            }
        }
        var d2 = -x2*x2 + 2*x2*self.xCenterPosition-self.xCenterPosition*self.xCenterPosition +
            self.radius*self.radius;
        if(d2>=0){
            root = self.yCenterPosition + Math.sqrt(d2);
            if((root >= y1)&&(root<=y2)){
                touchedPoints.push({'x': x2, 'y': root});
            }
            root = self.yCenterPosition - Math.sqrt(d2);
            if((root >= y1)&&(root<=y2)){
                touchedPoints.push({'x': x2, 'y': root});
            }
        }
        return touchedPoints;
    }
    function getHorizontalIntersectionPoints(brick){
        var touchedPoints =new Array(0);
        var x1 = brick.xCenterPosition - brick.width/2;
        var x2 = brick.xCenterPosition + brick.width/2;
        var y1 = brick.yCenterPosition - brick.height/2;
        var y2 = brick.yCenterPosition + brick.height/2;
        var d1 = -y1*y1 + 2*y1*self.yCenterPosition - self.yCenterPosition*self.yCenterPosition +
            self.radius * self.radius;
        var root;
        if(d1>=0){
            root = self.xCenterPosition + Math.sqrt(d1);
            if((root >= x1)&&(root<=x2)){
                touchedPoints.push({'x': root, 'y': y1});
            }
            root = self.xCenterPosition - Math.sqrt(d1);
            if((root >= x1)&&(root<=x2)){
                touchedPoints.push({'x': root, 'y': y1});
            }
        }
        var d2 =  -y2*y2 + 2*y2*self.yCenterPosition - self.yCenterPosition*self.yCenterPosition +
            self.radius * self.radius;
        if(d2>=0){
            root = self.xCenterPosition + Math.sqrt(d2);
            if((root >= x1)&&(root<=x2)){
                touchedPoints.push({'x': root, 'y': y2});
            }
            root = self.xCenterPosition - Math.sqrt(d2);
            if((root >= x1)&&(root<=x2)){
                touchedPoints.push({'x': root, 'y': y2});
            }
        }
        return touchedPoints;
    }
    // Проверка на выход за границы поля
    // И возвращения шара обратно
    function coordinateResearch(){
        if((self.yCenterPosition - self.radius) < 0){
            self.yCenterPosition = self.radius+0.1;
        }
        if((self.xCenterPosition - self.radius) < 0){
            self.xCenterPosition = self.radius + 0.1;
        }
        if((self.xCenterPosition + self.radius) > self.gameField.width){
            self.xCenterPosition = self.gameField.width - self.radius - 0.1;
        }
    }
    function hitBricks(touchedBricksIndices) {
        var bricks = self.gameField.bricks;
        for(var i =0; i < touchedBricksIndices.length; i++){
            var touchedBrick = bricks[touchedBricksIndices[i]];
            touchedBrick.hitPoints--;
            // помечаем место в массиве, которое занимал ныне полностью уничтоженный
            //блок, как null
            if(touchedBrick.hitPoints ==0){
                bricks[touchedBricksIndices[i]] = null;
            }
        }
        for(var i=0; i < bricks.length; i++){
            if(bricks[i]==null){
                bricks.splice(i,1);
                i--;
            }
        }
    }
};

window.arkanoid.Ball.createDefault = function(gameField) {
    var defaultBall = new window.arkanoid.Ball();
    defaultBall.radius = 10;
    defaultBall.direction = new window.arkanoid.Direction({'i' : 800, 'j':572.5});
    defaultBall.xCenterPosition = 80;
    defaultBall.yCenterPosition = 57.25;
    defaultBall.velocity = 300;
    defaultBall.color =new window.arkanoid.Color(200,200,200);
    defaultBall.gameField=gameField;
    return defaultBall;
};