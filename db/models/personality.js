"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ydbSDK = require("ydb-sdk");
let __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class Personality extends ydbSDK.TypedData {
    constructor(data) {
        super(data);
        this.personalityData = data.personalityData;
        this.idLocation = data.idLocation;
        this.idActivity = data.idActivity;
        this.idViolationCharter = data.idViolationCharter;
        this.temperaturePersonality = data.temperaturePersonality;
        this.datetimePersonality = data.datetimePersonality;
    }
    static create(personalityData, idLocation, idActivity, idViolationCharter, temperaturePersonality, datetimePersonality) {
        return new this({ personalityData, idLocation, idActivity, idViolationCharter, temperaturePersonality, datetimePersonality });
    }
};
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UTF8)
], Personality.prototype, "personalityData", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT64)
], Personality.prototype, "idLocation", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT64)
], Personality.prototype, "idActivity", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT64)
], Personality.prototype, "idViolationCharter", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.DOUBLE)
], Personality.prototype, "temperaturePersonality", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.DATETIME)
], Personality.prototype, "datetimePersonality", void 0);
Personality = __decorate([
    ydbSDK.withTypeOptions({ namesConversion: ydbSDK.snakeToCamelCaseConversion })
], Personality);
module.exports = Personality;
