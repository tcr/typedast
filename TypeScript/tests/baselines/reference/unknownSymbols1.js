//// [unknownSymbols1.ts]
var x = asdf;
var y: asdf;

function foo(x: asdf, y: number): asdf { }
function foo2() {
    return asdf;
}

var z = <asdf>x; // should be an error

class C<T> {
    foo: asdf;
    bar: C<asdf>;
}

class C2 implements asdf { }
interface I extends adsf { }

class C3 { constructor(x: any) { } }
class C4 extends C3 {
    constructor() {
        super(asdf);
    }
}

var x2 = this.asdf; // no error, this is any

class C5 {
    constructor() {
        this.asdf = asdf;
    }
}

//// [unknownSymbols1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var x = asdf;
var y;
function foo(x, y) {
}
function foo2() {
    return asdf;
}
var z = x; // should be an error
var C = (function () {
    function C() {
    }
    return C;
})();
var C2 = (function () {
    function C2() {
    }
    return C2;
})();
var C3 = (function () {
    function C3(x) {
    }
    return C3;
})();
var C4 = (function (_super) {
    __extends(C4, _super);
    function C4() {
        _super.call(this, asdf);
    }
    return C4;
})(C3);
var x2 = this.asdf; // no error, this is any
var C5 = (function () {
    function C5() {
        this.asdf = asdf;
    }
    return C5;
})();
