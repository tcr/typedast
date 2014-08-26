//// [stringIndexerConstrainsPropertyDeclarations2.ts]
// String indexer providing a constraint of a user defined type

class A {
    foo(): string { return ''; }
}

class B extends A {
    bar(): string { return ''; }
}

class Foo {
    [x: string]: A;
    a: A; // ok
    b: B; // ok
    c: number; // error
    d: string; // error
}

interface Foo2 {
    [x: string]: A;
    a: A; // ok
    b: B; // ok
    c: number; // error
    d: string; // error
}

var a: {
    [x: string]: A;
    a: A; // ok
    b: B; // ok
    c: number; // error
    d: string; // error
};

// error
var b: { [x: string]: A } = {
    a: A,
    b: B
}

//// [stringIndexerConstrainsPropertyDeclarations2.js]
// String indexer providing a constraint of a user defined type
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () {
        return '';
    };
    return A;
})();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    B.prototype.bar = function () {
        return '';
    };
    return B;
})(A);
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();
var a;
// error
var b = {
    a: A,
    b: B
};
