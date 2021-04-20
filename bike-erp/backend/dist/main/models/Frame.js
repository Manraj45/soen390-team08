"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameType = exports.Frame = void 0;
const Component_1 = require("./Component");
class Frame extends Component_1.Component {
    constructor(frame_id, frame_type, component_id, price, quantity, size, component_status, component_type) {
        super(component_id, price, quantity, size, component_status, component_type);
        this.frame_id = frame_id;
        this.frame_type = frame_type;
    }
    getFrame_id() {
        return this.frame_id;
    }
    setFrame_id(frame_id) {
        this.frame_id = frame_id;
    }
    getFrame_type() {
        return this.frame_type;
    }
    setFrame_type(frame_type) {
        this.frame_type = frame_type;
    }
}
exports.Frame = Frame;
var FrameType;
(function (FrameType) {
    FrameType[FrameType["UTILITY"] = 0] = "UTILITY";
    FrameType[FrameType["TOURING"] = 1] = "TOURING";
    FrameType[FrameType["MOUNTAIN"] = 2] = "MOUNTAIN";
})(FrameType = exports.FrameType || (exports.FrameType = {}));
