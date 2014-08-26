//// [duplicateIdentifiersAcrossContainerBoundaries.ts]
module M {
    export interface I { }
}
module M {
    export class I { } // error
}

module M {
    export function f() { }
}
module M {
    export class f { } // error
}

module M {
    function g() { }
}
module M {
    export class g { } // no error
}

module M {
    export class C { }
}
module M {
    function C() { } // no error
}

module M {
    export var v = 3;
}
module M {
    export var v = 3; // error for redeclaring var in a different parent
}

class Foo {
    static x: number;
}

module Foo {
    export var x: number; // error for redeclaring var in a different parent
}

module N {
    export module F {
        var t;
    }
}
declare module N {
    export function F(); // no error because function is ambient
}


//// [duplicateIdentifiersAcrossContainerBoundaries.js]
var M;
(function (M) {
    var I = (function () {
        function I() {
        }
        return I;
    })();
    M.I = I; // error
})(M || (M = {}));
var M;
(function (M) {
    function f() {
    }
    M.f = f;
})(M || (M = {}));
var M;
(function (M) {
    var f = (function () {
        function f() {
        }
        return f;
    })();
    M.f = f; // error
})(M || (M = {}));
var M;
(function (M) {
    function g() {
    }
})(M || (M = {}));
var M;
(function (M) {
    var g = (function () {
        function g() {
        }
        return g;
    })();
    M.g = g; // no error
})(M || (M = {}));
var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    M.C = C;
})(M || (M = {}));
var M;
(function (M) {
    function C() {
    } // no error
})(M || (M = {}));
var M;
(function (M) {
    M.v = 3;
})(M || (M = {}));
var M;
(function (M) {
    M.v = 3; // error for redeclaring var in a different parent
})(M || (M = {}));
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();
var Foo;
(function (Foo) {
    Foo.x; // error for redeclaring var in a different parent
})(Foo || (Foo = {}));
var N;
(function (N) {
    (function (F) {
        var t;
    })(N.F || (N.F = {}));
    var F = N.F;
})(N || (N = {}));
