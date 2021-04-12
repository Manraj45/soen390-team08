"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
class Location {
    constructor(location_id, name) {
        this.location_id = location_id;
        this.location = name;
    }
    getLocation_id() {
        return this.location_id;
    }
    setLocation_id(location_id) {
        this.location_id = location_id;
    }
    getLocation() {
        return this.location;
    }
    setLocation(name) {
        this.location = name;
    }
}
exports.Location = Location;
