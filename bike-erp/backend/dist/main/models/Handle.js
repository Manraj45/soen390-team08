"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleType = exports.Handle = void 0;
const Component_1 = require("./Component");
class Handle extends Component_1.Component {
    constructor(handle_id, handle_type, component_id, price, quantity, size, component_status, component_type) {
        super(component_id, price, quantity, size, component_status, component_type);
        this.handle_id = handle_id;
        this.handle_type = handle_type;
    }
    getHandle_id() {
        return this.handle_id;
    }
    setHandle_id(handle_id) {
        this.handle_id = handle_id;
    }
    getHandle_type() {
        return this.handle_type;
    }
    setHandle_type(handle_type) {
        this.handle_type = handle_type;
    }
}
exports.Handle = Handle;
var HandleType;
(function (HandleType) {
    HandleType[HandleType["FLAT"] = 0] = "FLAT";
    HandleType[HandleType["BULLHORN"] = 1] = "BULLHORN";
    HandleType[HandleType["DROP"] = 2] = "DROP";
})(HandleType = exports.HandleType || (exports.HandleType = {}));
