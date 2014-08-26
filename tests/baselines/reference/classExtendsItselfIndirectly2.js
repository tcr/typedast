//// [classExtendsItselfIndirectly2.ts]
class C extends N.E { foo: string; } // error

module M {
    export class D extends C { bar: string; }

}

module N {
    export class E extends M.D { baz: number; }
}

module O {
    class C2<T> extends Q.E2<T> { foo: T; } // error

    module P {
        export class D2<T> extends C2<T> { bar: T; }
    }

    module Q {
        export class E2<T> extends P.D2<T> { baz: T; }
    }
}

//// [classExtendsItselfIndirectly2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(N.E); // error
var M;
(function (M) {
    var D = (function (_super) {
        __extends(D, _super);
        function D() {
            _super.apply(this, arguments);
        }
        return D;
    })(C);
    M.D = D;
})(M || (M = {}));
var N;
(function (N) {
    var E = (function (_super) {
        __extends(E, _super);
        function E() {
            _super.apply(this, arguments);
        }
        return E;
    })(M.D);
    N.E = E;
})(N || (N = {}));
var O;
(function (O) {
    var C2 = (function (_super) {
        __extends(C2, _super);
        function C2() {
            _super.apply(this, arguments);
        }
        return C2;
    })(Q.E2); // error
    var P;
    (function (P) {
        var D2 = (function (_super) {
            __extends(D2, _super);
            function D2() {
                _super.apply(this, arguments);
            }
            return D2;
        })(C2);
        P.D2 = D2;
    })(P || (P = {}));
    var Q;
    (function (Q) {
        var E2 = (function (_super) {
            __extends(E2, _super);
            function E2() {
                _super.apply(this, arguments);
            }
            return E2;
        })(P.D2);
        Q.E2 = E2;
    })(Q || (Q = {}));
})(O || (O = {}));
