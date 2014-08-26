//// [conditionalOperatorWithoutIdenticalBCT.ts]
//Cond ? Expr1 : Expr2,  Expr1 and Expr2 have no identical best common type
class X { propertyX: any; propertyX1: number; propertyX2: string };
class A extends X { propertyA: number };
class B extends X { propertyB: string };

var x: X;
var a: A;
var b: B;

//Expect to have compiler errors
//Be not contextually typed
true ? a : b;
var result1 = true ? a : b;

//Be contextually typed and and bct is not identical
var result2: A = true ? a : b;
var result3: B = true ? a : b;

var result4: (t: X) => number = true ? (m) => m.propertyX1 : (n) => n.propertyX2;
var result5: (t: X) => string = true ? (m) => m.propertyX1 : (n) => n.propertyX2;
var result6: (t: X) => boolean = true ? (m) => m.propertyX1 : (n) => n.propertyX2;

//// [conditionalOperatorWithoutIdenticalBCT.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//Cond ? Expr1 : Expr2,  Expr1 and Expr2 have no identical best common type
var X = (function () {
    function X() {
    }
    return X;
})();
;
var A = (function (_super) {
    __extends(A, _super);
    function A() {
        _super.apply(this, arguments);
    }
    return A;
})(X);
;
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(X);
;
var x;
var a;
var b;
//Expect to have compiler errors
//Be not contextually typed
true ? a : b;
var result1 = true ? a : b;
//Be contextually typed and and bct is not identical
var result2 = true ? a : b;
var result3 = true ? a : b;
var result4 = true ? function (m) { return m.propertyX1; } : function (n) { return n.propertyX2; };
var result5 = true ? function (m) { return m.propertyX1; } : function (n) { return n.propertyX2; };
var result6 = true ? function (m) { return m.propertyX1; } : function (n) { return n.propertyX2; };
