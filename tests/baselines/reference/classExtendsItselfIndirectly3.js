//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendsItselfIndirectly3.ts] ////

//// [classExtendsItselfIndirectly_file1.ts]
class C extends E { foo: string; } // error

//// [classExtendsItselfIndirectly_file2.ts]
class D extends C { bar: string; }

//// [classExtendsItselfIndirectly_file3.ts]
class E extends D { baz: number; }

//// [classExtendsItselfIndirectly_file4.ts]
class C2<T> extends E2<T> { foo: T; } // error

//// [classExtendsItselfIndirectly_file5.ts]
class D2<T> extends C2<T> { bar: T; }

//// [classExtendsItselfIndirectly_file6.ts]
class E2<T> extends D2<T> { baz: T; }

//// [classExtendsItselfIndirectly_file1.js]
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
})(E); // error
//// [classExtendsItselfIndirectly_file2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
})(C);
//// [classExtendsItselfIndirectly_file3.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var E = (function (_super) {
    __extends(E, _super);
    function E() {
        _super.apply(this, arguments);
    }
    return E;
})(D);
//// [classExtendsItselfIndirectly_file4.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    return C2;
})(E2); // error
//// [classExtendsItselfIndirectly_file5.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        _super.apply(this, arguments);
    }
    return D2;
})(C2);
//// [classExtendsItselfIndirectly_file6.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var E2 = (function (_super) {
    __extends(E2, _super);
    function E2() {
        _super.apply(this, arguments);
    }
    return E2;
})(D2);
