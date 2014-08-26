//// [tests/cases/conformance/externalModules/exportAssignmentMergedModule.ts] ////

//// [foo_0.ts]
module Foo {
	export function a(){
		return 5;
	}
	export var b = true;
}
module Foo {
	export function c(a: number){
		return a;
	}
	export module Test {
		export var answer = 42;
	}
}
export = Foo;

//// [foo_1.ts]
import foo = require("./foo_0");
var a: number = foo.a();
if(!!foo.b){
	foo.Test.answer = foo.c(42);
}

//// [foo_0.js]
var Foo;
(function (Foo) {
    function a() {
        return 5;
    }
    Foo.a = a;
    Foo.b = true;
})(Foo || (Foo = {}));
var Foo;
(function (Foo) {
    function c(a) {
        return a;
    }
    Foo.c = c;
    (function (Test) {
        Test.answer = 42;
    })(Foo.Test || (Foo.Test = {}));
    var Test = Foo.Test;
})(Foo || (Foo = {}));
module.exports = Foo;
//// [foo_1.js]
var foo = require("./foo_0");
var a = foo.a();
if (!!foo.b) {
    foo.Test.answer = foo.c(42);
}
