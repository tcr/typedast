//// [tests/cases/compiler/commentsMultiModuleMultiFile.ts] ////

//// [commentsMultiModuleMultiFile_0.ts]

/** this is multi declare module*/
export module multiM {
    /// class b comment
    export class b {
    }
}
/** thi is multi module 2*/
export module multiM {
    /** class c comment*/
    export class c {
    }

    // class e comment
    export class e {
    }
}

new multiM.b();
new multiM.c();

//// [commentsMultiModuleMultiFile_1.ts]
import m = require('commentsMultiModuleMultiFile_0');
/** this is multi module 3 comment*/
export module multiM {
    /** class d comment*/
    export class d {
    }

    /// class f comment
    export class f {
    }
}
new multiM.d();

//// [commentsMultiModuleMultiFile_0.js]
define(["require", "exports"], function (require, exports) {
    /** this is multi declare module*/
    (function (multiM) {
        /// class b comment
        var b = (function () {
            function b() {
            }
            return b;
        })();
        multiM.b = b;
    })(exports.multiM || (exports.multiM = {}));
    var multiM = exports.multiM;
    /** thi is multi module 2*/
    (function (multiM) {
        /** class c comment*/
        var c = (function () {
            function c() {
            }
            return c;
        })();
        multiM.c = c;
        // class e comment
        var e = (function () {
            function e() {
            }
            return e;
        })();
        multiM.e = e;
    })(exports.multiM || (exports.multiM = {}));
    var multiM = exports.multiM;
    new multiM.b();
    new multiM.c();
});
//// [commentsMultiModuleMultiFile_1.js]
define(["require", "exports"], function (require, exports) {
    /** this is multi module 3 comment*/
    (function (multiM) {
        /** class d comment*/
        var d = (function () {
            function d() {
            }
            return d;
        })();
        multiM.d = d;
        /// class f comment
        var f = (function () {
            function f() {
            }
            return f;
        })();
        multiM.f = f;
    })(exports.multiM || (exports.multiM = {}));
    var multiM = exports.multiM;
    new multiM.d();
});


//// [commentsMultiModuleMultiFile_0.d.ts]
/** this is multi declare module*/
export declare module multiM {
    class b {
    }
}
/** thi is multi module 2*/
export declare module multiM {
    /** class c comment*/
    class c {
    }
    class e {
    }
}
//// [commentsMultiModuleMultiFile_1.d.ts]
/** this is multi module 3 comment*/
export declare module multiM {
    /** class d comment*/
    class d {
    }
    class f {
    }
}
