//// [genericDerivedTypeWithSpecializedBase2.ts]
class A<T extends { length: number }> {
    x: T;
}

class B<U> extends A<string> {
    y: U;
}

var x: A<{ length: number; foo: number }>;
var y: B<number>;
x = y;  // error


//// [genericDerivedTypeWithSpecializedBase2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A() {
    }
    return A;
})();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(A);
var x;
var y;
x = y; // error
