//// [copyrightWithoutNewLine1.ts]
/*****************************
* (c) Copyright - Important
****************************/
import model = require("./greeter")
var el = document.getElementById('content');
var greeter = new model.Greeter(el);
/** things */
greeter.start();

//// [copyrightWithoutNewLine1.js]
define(["require", "exports", "./greeter"], function (require, exports, model) {
    var el = document.getElementById('content');
    var greeter = new model.Greeter(el);
    /** things */
    greeter.start();
});
