//// [returnInConstructor1.ts]
class A {
    foo() { }
    constructor() {
        return;
    }
}

class B {
    foo() { }
    constructor() {
        return 1; // error
    }
}

class C {
    foo() { }
    constructor() {
        return this;
    }
}

class D {
    foo() { }
    constructor() {
        return "test"; // error
    }
}

class E {
    public foo: number;
    constructor() {
        return { foo: 1 };
    }
}

class F {
    public foo: string;
    constructor() {
        return { foo: 1 }; //error
    }
}

class G {
    private test: number;
    public test1() { }
    foo() { }
    constructor() {
        this.test = 2;
    }
}

class H extends F {
    constructor() {
        super();
        return new G(); //error
    }
}

class I extends G {
    constructor() {
        super();
        return new G();
    }
}



//// [returnInConstructor1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A() {
        return;
    }
    A.prototype.foo = function () {
    };
    return A;
})();
var B = (function () {
    function B() {
        return 1; // error
    }
    B.prototype.foo = function () {
    };
    return B;
})();
var C = (function () {
    function C() {
        return this;
    }
    C.prototype.foo = function () {
    };
    return C;
})();
var D = (function () {
    function D() {
        return "test"; // error
    }
    D.prototype.foo = function () {
    };
    return D;
})();
var E = (function () {
    function E() {
        return { foo: 1 };
    }
    return E;
})();
var F = (function () {
    function F() {
        return { foo: 1 }; //error
    }
    return F;
})();
var G = (function () {
    function G() {
        this.test = 2;
    }
    G.prototype.test1 = function () {
    };
    G.prototype.foo = function () {
    };
    return G;
})();
var H = (function (_super) {
    __extends(H, _super);
    function H() {
        _super.call(this);
        return new G(); //error
    }
    return H;
})(F);
var I = (function (_super) {
    __extends(I, _super);
    function I() {
        _super.call(this);
        return new G();
    }
    return I;
})(G);
