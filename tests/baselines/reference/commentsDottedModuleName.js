//// [commentsDottedModuleName.ts]

/** this is multi declare module*/
export module outerModule.InnerModule {
    /// class b comment
    export class b {
    }
}

//// [commentsDottedModuleName.js]
define(["require", "exports"], function (require, exports) {
    /** this is multi declare module*/
    (function (outerModule) {
        (function (InnerModule) {
            /// class b comment
            var b = (function () {
                function b() {
                }
                return b;
            })();
            InnerModule.b = b;
        })(outerModule.InnerModule || (outerModule.InnerModule = {}));
        var InnerModule = outerModule.InnerModule;
    })(exports.outerModule || (exports.outerModule = {}));
    var outerModule = exports.outerModule;
});


//// [commentsDottedModuleName.d.ts]
/** this is multi declare module*/
export declare module outerModule.InnerModule {
    class b {
    }
}
