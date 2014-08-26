//// [extendNonClassSymbol2.ts]
function Foo() {
   this.x = 1;
}
var x = new Foo(); // legal, considered a constructor function
class C extends Foo {} // error, could not find symbol Foo

//// [extendNonClassSymbol2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
function Foo() {
    this.x = 1;
}
var x = new Foo(); // legal, considered a constructor function
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(Foo); // error, could not find symbol Foo
