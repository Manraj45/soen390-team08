"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriveTrainType = exports.DriveTrain = void 0;
const Component_1 = require("./Component");
class DriveTrain extends Component_1.Component {
    constructor(drive_train_id, drive_train_type, component_id, price, quantity, size, component_status, component_type) {
        super(component_id, price, quantity, size, component_status, component_type);
        this.drive_train_id = drive_train_id;
        this.drive_train_type = drive_train_type;
    }
    getDrive_train_id() {
        return this.drive_train_id;
    }
    setDrive_train_id(drive_train_id) {
        this.drive_train_id = drive_train_id;
    }
    getDrive_train_type() {
        return this.drive_train_type;
    }
    setDrive_train_type(drive_train_type) {
        this.drive_train_type = drive_train_type;
    }
}
exports.DriveTrain = DriveTrain;
var DriveTrainType;
(function (DriveTrainType) {
    DriveTrainType[DriveTrainType["NOVICE"] = 0] = "NOVICE";
    DriveTrainType[DriveTrainType["INTERMEDIATE"] = 1] = "INTERMEDIATE";
    DriveTrainType[DriveTrainType["ADVANCED"] = 2] = "ADVANCED";
    DriveTrainType[DriveTrainType["EXPERT"] = 3] = "EXPERT";
})(DriveTrainType = exports.DriveTrainType || (exports.DriveTrainType = {}));
