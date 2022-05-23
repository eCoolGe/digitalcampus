"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ydbSDK = require("ydb-sdk");
let __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class Locations extends ydbSDK.TypedData {
    constructor(data) {
        super(data);
        this.idLocation = data.idLocation;
        this.nameLocation = data.nameLocation;
        this.addressLocation = data.addressLocation;
        this.coordsLocation = data.coordsLocation;
    }
    static create(idLocation, nameLocation, addressLocation, coordsLocation) {
        return new this({ idLocation, nameLocation, addressLocation, coordsLocation });
    }
};
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT64)
], Locations.prototype, "idLocation", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UTF8)
], Locations.prototype, "nameLocation", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UTF8)
], Locations.prototype, "addressLocation", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UTF8)
], Locations.prototype, "coordsLocation", void 0);
Locations = __decorate([
    ydbSDK.withTypeOptions({ namesConversion: ydbSDK.snakeToCamelCaseConversion })
], Locations);
module.exports = Locations;
