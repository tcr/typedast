//// [tests/cases/compiler/commentsExternalModules2.ts] ////

//// [commentsExternalModules2_0.ts]

/** Module comment*/
export module m1 {
    /** b's comment*/
    export var b: number;
    /** foo's comment*/
    function foo() {
        return b;
    }
    /** m2 comments*/
    export module m2 {
        /** class comment;*/
        export class c {
        };
        /** i*/
        export var i = new c();
    }
    /** exported function*/
    export function fooExport() {
        return foo();
    }
}
m1.fooExport();
var myvar = new m1.m2.c();

/** Module comment */
export module m4 {
    /** b's comment */
    export var b: number;
    /** foo's comment
    */
    function foo() {
        return b;
    }
    /** m2 comments
    */
    export module m2 {
        /** class comment; */
        export class c {
        };
        /** i */
        export var i = new c();
    }
    /** exported function */
    export function fooExport() {
        return foo();
    }
}
m4.fooExport();
var myvar2 = new m4.m2.c();

//// [commentsExternalModules_1.ts]
/**This is on import declaration*/
import extMod = require("commentsExternalModules2_0"); // trailing comment 1
extMod.m1.fooExport();
export var newVar = new extMod.m1.m2.c();
extMod.m4.fooExport();
export var newVar2 = new extMod.m4.m2.c();


//// [commentsExternalModules2_0.js]
define(["require", "exports"], function (require, exports) {
    /** Module comment*/
    (function (m1) {
        /** b's comment*/
        m1.b;
        /** foo's comment*/
        function foo() {
            return m1.b;
        }
        /** m2 comments*/
        (function (m2) {
            /** class comment;*/
            var c = (function () {
                function c() {
                }
                return c;
            })();
            m2.c = c;
            ;
            /** i*/
            m2.i = new c();
        })(m1.m2 || (m1.m2 = {}));
        var m2 = m1.m2;
        /** exported function*/
        function fooExport() {
            return foo();
        }
        m1.fooExport = fooExport;
    })(exports.m1 || (exports.m1 = {}));
    var m1 = exports.m1;
    m1.fooExport();
    var myvar = new m1.m2.c();
    /** Module comment */
    (function (m4) {
        /** b's comment */
        m4.b;
        /** foo's comment
        */
        function foo() {
            return m4.b;
        }
        /** m2 comments
        */
        (function (m2) {
            /** class comment; */
            var c = (function () {
                function c() {
                }
                return c;
            })();
            m2.c = c;
            ;
            /** i */
            m2.i = new c();
        })(m4.m2 || (m4.m2 = {}));
        var m2 = m4.m2;
        /** exported function */
        function fooExport() {
            return foo();
        }
        m4.fooExport = fooExport;
    })(exports.m4 || (exports.m4 = {}));
    var m4 = exports.m4;
    m4.fooExport();
    var myvar2 = new m4.m2.c();
});
//// [commentsExternalModules_1.js]
define(["require", "exports", "commentsExternalModules2_0"], function (require, exports, extMod) {
    extMod.m1.fooExport();
    exports.newVar = new extMod.m1.m2.c();
    extMod.m4.fooExport();
    exports.newVar2 = new extMod.m4.m2.c();
});


//// [commentsExternalModules2_0.d.ts]
/** Module comment*/
export declare module m1 {
    /** b's comment*/
    var b: number;
    /** m2 comments*/
    module m2 {
        /** class comment;*/
        class c {
        }
        /** i*/
        var i: c;
    }
    /** exported function*/
    function fooExport(): number;
}
/** Module comment */
export declare module m4 {
    /** b's comment */
    var b: number;
    /** m2 comments
    */
    module m2 {
        /** class comment; */
        class c {
        }
        /** i */
        var i: c;
    }
    /** exported function */
    function fooExport(): number;
}
//// [commentsExternalModules_1.d.ts]
/**This is on import declaration*/
import extMod = require("commentsExternalModules2_0");
export declare var newVar: extMod.m1.m2.c;
export declare var newVar2: extMod.m4.m2.c;
