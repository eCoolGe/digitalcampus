"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ydbSDK = require("ydb-sdk");
let __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class Violation_Charters extends ydbSDK.TypedData {
    constructor(data) {
        super(data);
        this.idViolationCharter = data.idViolationCharter;
        this.nameViolationCharter = data.nameViolationCharter;
        this.typeViolationCharter = data.typeViolationCharter;
    }
    static create(idViolationCharter, nameViolationCharter, typeViolationCharter) {
        return new this({ idViolationCharter, nameViolationCharter, typeViolationCharter });
    }
};
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT64)
], Violation_Charters.prototype, "idViolationCharter", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UTF8)
], Violation_Charters.prototype, "nameViolationCharter", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT64)
], Violation_Charters.prototype, "typeViolationCharter", void 0);
Violation_Charters = __decorate([
    ydbSDK.withTypeOptions({ namesConversion: ydbSDK.snakeToCamelCaseConversion })
], Violation_Charters);
module.exports = Violation_Charters;
