//// [tests/cases/compiler/privacyVarDeclFile.ts] ////

//// [privacyVarDeclFile_externalModule.ts]

class privateClass {
}

export class publicClass {
}

export interface publicInterfaceWithPrivatePropertyTypes {
    myProperty: privateClass;  // Error
}

export interface publicInterfaceWithPublicPropertyTypes {
    myProperty: publicClass;
}

interface privateInterfaceWithPrivatePropertyTypes {
    myProperty: privateClass;
}

interface privateInterfaceWithPublicPropertyTypes {
    myProperty: publicClass;
}

export class publicClassWithWithPrivatePropertyTypes {
    static myPublicStaticProperty: privateClass; // Error
    private static myPrivateStaticProperty: privateClass;
    myPublicProperty: privateClass; // Error
    private myPrivateProperty: privateClass;
}

export class publicClassWithWithPublicPropertyTypes {
    static myPublicStaticProperty: publicClass;
    private static myPrivateStaticProperty: publicClass;
    myPublicProperty: publicClass;
    private myPrivateProperty: publicClass;
}

class privateClassWithWithPrivatePropertyTypes {
    static myPublicStaticProperty: privateClass;
    private static myPrivateStaticProperty: privateClass;
    myPublicProperty: privateClass;
    private myPrivateProperty: privateClass;
}

class privateClassWithWithPublicPropertyTypes {
    static myPublicStaticProperty: publicClass;
    private static myPrivateStaticProperty: publicClass;
    myPublicProperty: publicClass;
    private myPrivateProperty: publicClass;
}

export var publicVarWithPrivatePropertyTypes: privateClass; // Error
export var publicVarWithPublicPropertyTypes: publicClass;
var privateVarWithPrivatePropertyTypes: privateClass;
var privateVarWithPublicPropertyTypes: publicClass;

export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass; // Error
export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

export interface publicInterfaceWithPrivateModulePropertyTypes {
    myProperty: privateModule.publicClass; // Error
}
export class publicClassWithPrivateModulePropertyTypes {
    static myPublicStaticProperty: privateModule.publicClass; // Error
    myPublicProperty: privateModule.publicClass; // Error
}
export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error
export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error

interface privateInterfaceWithPrivateModulePropertyTypes {
    myProperty: privateModule.publicClass;
}
class privateClassWithPrivateModulePropertyTypes {
    static myPublicStaticProperty: privateModule.publicClass;
    myPublicProperty: privateModule.publicClass;
}
var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;

export module publicModule {
    class privateClass {
    }

    export class publicClass {
    }

    export interface publicInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;  // Error
    }

    export interface publicInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    interface privateInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;
    }

    interface privateInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    export class publicClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass; // Error
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass; // Error
        private myPrivateProperty: privateClass;
    }

    export class publicClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    class privateClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass;
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass;
        private myPrivateProperty: privateClass;
    }

    class privateClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    export var publicVarWithPrivatePropertyTypes: privateClass; // Error
    export var publicVarWithPublicPropertyTypes: publicClass;
    var privateVarWithPrivatePropertyTypes: privateClass;
    var privateVarWithPublicPropertyTypes: publicClass;

    export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass; // Error
    export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
    declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
    declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

    export interface publicInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass; // Error
    }
    export class publicClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass; // Error
        myPublicProperty: privateModule.publicClass; // Error
    }
    export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error
    export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error

    interface privateInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass;
    }
    class privateClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass;
        myPublicProperty: privateModule.publicClass;
    }
    var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
}

module privateModule {
    class privateClass {
    }

    export class publicClass {
    }

    export interface publicInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;  
    }

    export interface publicInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    interface privateInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;
    }

    interface privateInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    export class publicClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass; 
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass; 
        private myPrivateProperty: privateClass;
    }

    export class publicClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    class privateClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass;
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass;
        private myPrivateProperty: privateClass;
    }

    class privateClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    export var publicVarWithPrivatePropertyTypes: privateClass; 
    export var publicVarWithPublicPropertyTypes: publicClass;
    var privateVarWithPrivatePropertyTypes: privateClass;
    var privateVarWithPublicPropertyTypes: publicClass;

    export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass; 
    export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
    declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
    declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

    export interface publicInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass; 
    }
    export class publicClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass; 
        myPublicProperty: privateModule.publicClass; 
    }
    export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass; 
    export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;

    interface privateInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass;
    }
    class privateClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass;
        myPublicProperty: privateModule.publicClass;
    }
    var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
}

//// [privacyVarDeclFile_GlobalFile.ts]
class publicClassInGlobal {
}
interface publicInterfaceWithPublicPropertyTypesInGlobal {
    myProperty: publicClassInGlobal;
}
class publicClassWithWithPublicPropertyTypesInGlobal {
    static myPublicStaticProperty: publicClassInGlobal;
    private static myPrivateStaticProperty: publicClassInGlobal;
    myPublicProperty: publicClassInGlobal;
    private myPrivateProperty: publicClassInGlobal;
}
var publicVarWithPublicPropertyTypesInGlobal: publicClassInGlobal;
declare var publicAmbientVarWithPublicPropertyTypesInGlobal: publicClassInGlobal;

module publicModuleInGlobal {
    class privateClass {
    }

    export class publicClass {
    }

    module privateModule {
        class privateClass {
        }

        export class publicClass {
        }

        export interface publicInterfaceWithPrivatePropertyTypes {
            myProperty: privateClass;
        }

        export interface publicInterfaceWithPublicPropertyTypes {
            myProperty: publicClass;
        }

        interface privateInterfaceWithPrivatePropertyTypes {
            myProperty: privateClass;
        }

        interface privateInterfaceWithPublicPropertyTypes {
            myProperty: publicClass;
        }

        export class publicClassWithWithPrivatePropertyTypes {
            static myPublicStaticProperty: privateClass;
            private static myPrivateStaticProperty: privateClass;
            myPublicProperty: privateClass;
            private myPrivateProperty: privateClass;
        }

        export class publicClassWithWithPublicPropertyTypes {
            static myPublicStaticProperty: publicClass;
            private static myPrivateStaticProperty: publicClass;
            myPublicProperty: publicClass;
            private myPrivateProperty: publicClass;
        }

        class privateClassWithWithPrivatePropertyTypes {
            static myPublicStaticProperty: privateClass;
            private static myPrivateStaticProperty: privateClass;
            myPublicProperty: privateClass;
            private myPrivateProperty: privateClass;
        }

        class privateClassWithWithPublicPropertyTypes {
            static myPublicStaticProperty: publicClass;
            private static myPrivateStaticProperty: publicClass;
            myPublicProperty: publicClass;
            private myPrivateProperty: publicClass;
        }

        export var publicVarWithPrivatePropertyTypes: privateClass;
        export var publicVarWithPublicPropertyTypes: publicClass;
        var privateVarWithPrivatePropertyTypes: privateClass;
        var privateVarWithPublicPropertyTypes: publicClass;

        export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass;
        export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
        declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
        declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

        export interface publicInterfaceWithPrivateModulePropertyTypes {
            myProperty: privateModule.publicClass;
        }
        export class publicClassWithPrivateModulePropertyTypes {
            static myPublicStaticProperty: privateModule.publicClass;
            myPublicProperty: privateModule.publicClass;
        }
        export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass;
        export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;

        interface privateInterfaceWithPrivateModulePropertyTypes {
            myProperty: privateModule.publicClass;
        }
        class privateClassWithPrivateModulePropertyTypes {
            static myPublicStaticProperty: privateModule.publicClass;
            myPublicProperty: privateModule.publicClass;
        }
        var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
        declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    }

    export interface publicInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;  // Error
    }

    export interface publicInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    interface privateInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;
    }

    interface privateInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    export class publicClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass; // Error
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass; // Error
        private myPrivateProperty: privateClass;
    }

    export class publicClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    class privateClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass;
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass;
        private myPrivateProperty: privateClass;
    }

    class privateClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    export var publicVarWithPrivatePropertyTypes: privateClass; // Error
    export var publicVarWithPublicPropertyTypes: publicClass;
    var privateVarWithPrivatePropertyTypes: privateClass;
    var privateVarWithPublicPropertyTypes: publicClass;

    export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass; // Error
    export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
    declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
    declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

    export interface publicInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass; // Error
    }
    export class publicClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass; // Error
        myPublicProperty: privateModule.publicClass; // Error
    }
    export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error
    export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error

    interface privateInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass;
    }
    class privateClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass;
        myPublicProperty: privateModule.publicClass;
    }
    var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
}

//// [privacyVarDeclFile_externalModule.js]
var privateClass = (function () {
    function privateClass() {
    }
    return privateClass;
})();
var publicClass = (function () {
    function publicClass() {
    }
    return publicClass;
})();
exports.publicClass = publicClass;
var publicClassWithWithPrivatePropertyTypes = (function () {
    function publicClassWithWithPrivatePropertyTypes() {
    }
    return publicClassWithWithPrivatePropertyTypes;
})();
exports.publicClassWithWithPrivatePropertyTypes = publicClassWithWithPrivatePropertyTypes;
var publicClassWithWithPublicPropertyTypes = (function () {
    function publicClassWithWithPublicPropertyTypes() {
    }
    return publicClassWithWithPublicPropertyTypes;
})();
exports.publicClassWithWithPublicPropertyTypes = publicClassWithWithPublicPropertyTypes;
var privateClassWithWithPrivatePropertyTypes = (function () {
    function privateClassWithWithPrivatePropertyTypes() {
    }
    return privateClassWithWithPrivatePropertyTypes;
})();
var privateClassWithWithPublicPropertyTypes = (function () {
    function privateClassWithWithPublicPropertyTypes() {
    }
    return privateClassWithWithPublicPropertyTypes;
})();
exports.publicVarWithPrivatePropertyTypes; // Error
exports.publicVarWithPublicPropertyTypes;
var privateVarWithPrivatePropertyTypes;
var privateVarWithPublicPropertyTypes;
var publicClassWithPrivateModulePropertyTypes = (function () {
    function publicClassWithPrivateModulePropertyTypes() {
    }
    return publicClassWithPrivateModulePropertyTypes;
})();
exports.publicClassWithPrivateModulePropertyTypes = publicClassWithPrivateModulePropertyTypes;
exports.publicVarWithPrivateModulePropertyTypes; // Error
var privateClassWithPrivateModulePropertyTypes = (function () {
    function privateClassWithPrivateModulePropertyTypes() {
    }
    return privateClassWithPrivateModulePropertyTypes;
})();
var privateVarWithPrivateModulePropertyTypes;
(function (publicModule) {
    var privateClass = (function () {
        function privateClass() {
        }
        return privateClass;
    })();
    var publicClass = (function () {
        function publicClass() {
        }
        return publicClass;
    })();
    publicModule.publicClass = publicClass;
    var publicClassWithWithPrivatePropertyTypes = (function () {
        function publicClassWithWithPrivatePropertyTypes() {
        }
        return publicClassWithWithPrivatePropertyTypes;
    })();
    publicModule.publicClassWithWithPrivatePropertyTypes = publicClassWithWithPrivatePropertyTypes;
    var publicClassWithWithPublicPropertyTypes = (function () {
        function publicClassWithWithPublicPropertyTypes() {
        }
        return publicClassWithWithPublicPropertyTypes;
    })();
    publicModule.publicClassWithWithPublicPropertyTypes = publicClassWithWithPublicPropertyTypes;
    var privateClassWithWithPrivatePropertyTypes = (function () {
        function privateClassWithWithPrivatePropertyTypes() {
        }
        return privateClassWithWithPrivatePropertyTypes;
    })();
    var privateClassWithWithPublicPropertyTypes = (function () {
        function privateClassWithWithPublicPropertyTypes() {
        }
        return privateClassWithWithPublicPropertyTypes;
    })();
    publicModule.publicVarWithPrivatePropertyTypes; // Error
    publicModule.publicVarWithPublicPropertyTypes;
    var privateVarWithPrivatePropertyTypes;
    var privateVarWithPublicPropertyTypes;
    var publicClassWithPrivateModulePropertyTypes = (function () {
        function publicClassWithPrivateModulePropertyTypes() {
        }
        return publicClassWithPrivateModulePropertyTypes;
    })();
    publicModule.publicClassWithPrivateModulePropertyTypes = publicClassWithPrivateModulePropertyTypes;
    publicModule.publicVarWithPrivateModulePropertyTypes; // Error
    var privateClassWithPrivateModulePropertyTypes = (function () {
        function privateClassWithPrivateModulePropertyTypes() {
        }
        return privateClassWithPrivateModulePropertyTypes;
    })();
    var privateVarWithPrivateModulePropertyTypes;
})(exports.publicModule || (exports.publicModule = {}));
var publicModule = exports.publicModule;
var privateModule;
(function (privateModule) {
    var privateClass = (function () {
        function privateClass() {
        }
        return privateClass;
    })();
    var publicClass = (function () {
        function publicClass() {
        }
        return publicClass;
    })();
    privateModule.publicClass = publicClass;
    var publicClassWithWithPrivatePropertyTypes = (function () {
        function publicClassWithWithPrivatePropertyTypes() {
        }
        return publicClassWithWithPrivatePropertyTypes;
    })();
    privateModule.publicClassWithWithPrivatePropertyTypes = publicClassWithWithPrivatePropertyTypes;
    var publicClassWithWithPublicPropertyTypes = (function () {
        function publicClassWithWithPublicPropertyTypes() {
        }
        return publicClassWithWithPublicPropertyTypes;
    })();
    privateModule.publicClassWithWithPublicPropertyTypes = publicClassWithWithPublicPropertyTypes;
    var privateClassWithWithPrivatePropertyTypes = (function () {
        function privateClassWithWithPrivatePropertyTypes() {
        }
        return privateClassWithWithPrivatePropertyTypes;
    })();
    var privateClassWithWithPublicPropertyTypes = (function () {
        function privateClassWithWithPublicPropertyTypes() {
        }
        return privateClassWithWithPublicPropertyTypes;
    })();
    privateModule.publicVarWithPrivatePropertyTypes;
    privateModule.publicVarWithPublicPropertyTypes;
    var privateVarWithPrivatePropertyTypes;
    var privateVarWithPublicPropertyTypes;
    var publicClassWithPrivateModulePropertyTypes = (function () {
        function publicClassWithPrivateModulePropertyTypes() {
        }
        return publicClassWithPrivateModulePropertyTypes;
    })();
    privateModule.publicClassWithPrivateModulePropertyTypes = publicClassWithPrivateModulePropertyTypes;
    privateModule.publicVarWithPrivateModulePropertyTypes;
    var privateClassWithPrivateModulePropertyTypes = (function () {
        function privateClassWithPrivateModulePropertyTypes() {
        }
        return privateClassWithPrivateModulePropertyTypes;
    })();
    var privateVarWithPrivateModulePropertyTypes;
})(privateModule || (privateModule = {}));
//// [privacyVarDeclFile_GlobalFile.js]
var publicClassInGlobal = (function () {
    function publicClassInGlobal() {
    }
    return publicClassInGlobal;
})();
var publicClassWithWithPublicPropertyTypesInGlobal = (function () {
    function publicClassWithWithPublicPropertyTypesInGlobal() {
    }
    return publicClassWithWithPublicPropertyTypesInGlobal;
})();
var publicVarWithPublicPropertyTypesInGlobal;
var publicModuleInGlobal;
(function (publicModuleInGlobal) {
    var privateClass = (function () {
        function privateClass() {
        }
        return privateClass;
    })();
    var publicClass = (function () {
        function publicClass() {
        }
        return publicClass;
    })();
    publicModuleInGlobal.publicClass = publicClass;
    var privateModule;
    (function (privateModule) {
        var privateClass = (function () {
            function privateClass() {
            }
            return privateClass;
        })();
        var publicClass = (function () {
            function publicClass() {
            }
            return publicClass;
        })();
        privateModule.publicClass = publicClass;
        var publicClassWithWithPrivatePropertyTypes = (function () {
            function publicClassWithWithPrivatePropertyTypes() {
            }
            return publicClassWithWithPrivatePropertyTypes;
        })();
        privateModule.publicClassWithWithPrivatePropertyTypes = publicClassWithWithPrivatePropertyTypes;
        var publicClassWithWithPublicPropertyTypes = (function () {
            function publicClassWithWithPublicPropertyTypes() {
            }
            return publicClassWithWithPublicPropertyTypes;
        })();
        privateModule.publicClassWithWithPublicPropertyTypes = publicClassWithWithPublicPropertyTypes;
        var privateClassWithWithPrivatePropertyTypes = (function () {
            function privateClassWithWithPrivatePropertyTypes() {
            }
            return privateClassWithWithPrivatePropertyTypes;
        })();
        var privateClassWithWithPublicPropertyTypes = (function () {
            function privateClassWithWithPublicPropertyTypes() {
            }
            return privateClassWithWithPublicPropertyTypes;
        })();
        privateModule.publicVarWithPrivatePropertyTypes;
        privateModule.publicVarWithPublicPropertyTypes;
        var privateVarWithPrivatePropertyTypes;
        var privateVarWithPublicPropertyTypes;
        var publicClassWithPrivateModulePropertyTypes = (function () {
            function publicClassWithPrivateModulePropertyTypes() {
            }
            return publicClassWithPrivateModulePropertyTypes;
        })();
        privateModule.publicClassWithPrivateModulePropertyTypes = publicClassWithPrivateModulePropertyTypes;
        privateModule.publicVarWithPrivateModulePropertyTypes;
        var privateClassWithPrivateModulePropertyTypes = (function () {
            function privateClassWithPrivateModulePropertyTypes() {
            }
            return privateClassWithPrivateModulePropertyTypes;
        })();
        var privateVarWithPrivateModulePropertyTypes;
    })(privateModule || (privateModule = {}));
    var publicClassWithWithPrivatePropertyTypes = (function () {
        function publicClassWithWithPrivatePropertyTypes() {
        }
        return publicClassWithWithPrivatePropertyTypes;
    })();
    publicModuleInGlobal.publicClassWithWithPrivatePropertyTypes = publicClassWithWithPrivatePropertyTypes;
    var publicClassWithWithPublicPropertyTypes = (function () {
        function publicClassWithWithPublicPropertyTypes() {
        }
        return publicClassWithWithPublicPropertyTypes;
    })();
    publicModuleInGlobal.publicClassWithWithPublicPropertyTypes = publicClassWithWithPublicPropertyTypes;
    var privateClassWithWithPrivatePropertyTypes = (function () {
        function privateClassWithWithPrivatePropertyTypes() {
        }
        return privateClassWithWithPrivatePropertyTypes;
    })();
    var privateClassWithWithPublicPropertyTypes = (function () {
        function privateClassWithWithPublicPropertyTypes() {
        }
        return privateClassWithWithPublicPropertyTypes;
    })();
    publicModuleInGlobal.publicVarWithPrivatePropertyTypes; // Error
    publicModuleInGlobal.publicVarWithPublicPropertyTypes;
    var privateVarWithPrivatePropertyTypes;
    var privateVarWithPublicPropertyTypes;
    var publicClassWithPrivateModulePropertyTypes = (function () {
        function publicClassWithPrivateModulePropertyTypes() {
        }
        return publicClassWithPrivateModulePropertyTypes;
    })();
    publicModuleInGlobal.publicClassWithPrivateModulePropertyTypes = publicClassWithPrivateModulePropertyTypes;
    publicModuleInGlobal.publicVarWithPrivateModulePropertyTypes; // Error
    var privateClassWithPrivateModulePropertyTypes = (function () {
        function privateClassWithPrivateModulePropertyTypes() {
        }
        return privateClassWithPrivateModulePropertyTypes;
    })();
    var privateVarWithPrivateModulePropertyTypes;
})(publicModuleInGlobal || (publicModuleInGlobal = {}));
