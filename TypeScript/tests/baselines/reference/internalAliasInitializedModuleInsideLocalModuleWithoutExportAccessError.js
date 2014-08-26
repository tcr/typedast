//// [internalAliasInitializedModuleInsideLocalModuleWithoutExportAccessError.ts]
export module a {
    export module b {
        export class c {
        }
    }
}

export module c {
    import b = a.b;
    export var x: b.c = new b.c();
}

export var d = new c.b.c();

//// [internalAliasInitializedModuleInsideLocalModuleWithoutExportAccessError.js]
(function (a) {
    (function (b) {
        var c = (function () {
            function c() {
            }
            return c;
        })();
        b.c = c;
    })(a.b || (a.b = {}));
    var b = a.b;
})(exports.a || (exports.a = {}));
var a = exports.a;
(function (c) {
    var b = a.b;
    c.x = new b.c();
})(exports.c || (exports.c = {}));
var c = exports.c;
exports.d = new c.b.c();
