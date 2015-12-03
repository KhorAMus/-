/**
 * Created by khoramus on 26.11.2015.
 */
if(window.arkanoid == undefined) window.arkanoid = {};

window.arkanoid.Color = function Color(r, g, b){
    this.red=r;
    this.green=g;
    this.blue=b;
    this.toString = function(){
        return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
    };
    Object.defineProperty(this, "toString", {
        enumerable: false
    });
};

