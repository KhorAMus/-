/**
 * Created by khoramus on 28.11.2015.
 */
if(window.arkanoid == undefined) window.arkanoid = {};
if(window.arkanoid.VectorProcedures == undefined) window.arkanoid.VectorProcedures = {};
window.arkanoid.VectorProcedures.getLength = function(v){
    return Math.sqrt(v.i* v.i+ v.j* v.j);
};
window.arkanoid.VectorProcedures.calculateDot = function(v1, v2){
    return (v1.i* v2.i+ v1.j* v2.j);
};
window.arkanoid.VectorProcedures.setLength = function (vector, length){
    var newOldLengthRatio = length / this.getLength(vector);
    this.increaseLength(vector, newOldLengthRatio);
};

window.arkanoid.VectorProcedures.increaseLength = function (vector, newOldLengthRatio){
    vector.i *= newOldLengthRatio;
    vector.j *= newOldLengthRatio;
};

window.arkanoid.VectorProcedures.invert = function (vector){
    vector.i = - vector.i;
    vector.j = -vector.j;

};



