"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ydbSDK = require("ydb-sdk");
let __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class Skud extends ydbSDK.TypedData {
    constructor(data) {
        super(data);
        this.idSkud = data.idSkud;
        this.idPass = data.idPass;
        this.datetimeEntry = data.datetimeEntry;
        this.datetimeExit = data.datetimeExit;
    }
    static create(idSkud, idPass, datetimeEntry, datetimeExit) {
        return new this({ idSkud, idPass, datetimeEntry, datetimeExit });
    }
};
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT64)
], Skud.prototype, "idSkud", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT64)
], Skud.prototype, "idPass", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.DATETIME)
], Skud.prototype, "datetimeEntry", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.DATETIME)
], Skud.prototype, "datetimeExit", void 0);
Skud = __decorate([
    ydbSDK.withTypeOptions({ namesConversion: ydbSDK.snakeToCamelCaseConversion })
], Skud);
module.exports = Skud;
