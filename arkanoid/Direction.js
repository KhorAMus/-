/**
 * Created by khoramus on 28.11.2015.
 */
if(window.arkanoid == undefined) window.arkanoid = {};

//Direction задаёт направление. При передаче в конструктор нулевого вектора
//направление станет равным направлению вектора (0,-1)
//принимает объект с числовыми полями i и j
window.arkanoid.Direction = function(vector){
    var vectorCopy = {};
    vectorCopy.i = vector.i;
    vectorCopy.j = vector.j;
    // Нормализуем принимаемый вектор или установим (0,-1)
    // в случае если он нулевой
    if((vectorCopy.i == vectorCopy.j)&&(vectorCopy.i == 0)) {
        vectorCopy.i = 0;
        vectorCopy.j = -1;
    }
    else {
        var newLengthOldRatio = 1.0 / Math.sqrt(vectorCopy.i*vectorCopy.i + vectorCopy.j*vectorCopy.j);
        vectorCopy.i *= newLengthOldRatio;
        vectorCopy.j *= newLengthOldRatio;
    }
    // i и j задают единичный вектор
    var i=vectorCopy.i;
    var j=vectorCopy.j;
    this.getUnionVector = function() {
        return {"i" : i, "j" : j};
    };


};
