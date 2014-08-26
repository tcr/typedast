//// [exportAssignmentAndDeclaration.ts]
export enum E1 {
	A,B,C
}

class C1 {

}

// Invalid, as there is already an exported member.
export = C1;

//// [exportAssignmentAndDeclaration.js]
define(["require", "exports"], function (require, exports) {
    (function (E1) {
        E1[E1["A"] = 0] = "A";
        E1[E1["B"] = 1] = "B";
        E1[E1["C"] = 2] = "C";
    })(exports.E1 || (exports.E1 = {}));
    var E1 = exports.E1;
    var C1 = (function () {
        function C1() {
        }
        return C1;
    })();
    return C1;
});
