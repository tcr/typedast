//// [tests/cases/compiler/exportAssignmentClass.ts] ////

//// [exportAssignmentClass_A.ts]
class C { public p = 0; }

export = C;

//// [exportAssignmentClass_B.ts]
import D = require("exportAssignmentClass_A");

var d = new D();
var x = d.p;

//// [exportAssignmentClass_A.js]
define(["require", "exports"], function (require, exports) {
    var C = (function () {
        function C() {
            this.p = 0;
        }
        return C;
    })();
    return C;
});
//// [exportAssignmentClass_B.js]
define(["require", "exports", "exportAssignmentClass_A"], function (require, exports, D) {
    var d = new D();
    var x = d.p;
});
