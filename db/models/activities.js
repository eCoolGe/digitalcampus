"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ydbSDK = require("ydb-sdk");
let __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class Activities extends ydbSDK.TypedData {
    constructor(data) {
        super(data);
        this.idActivity = data.idActivity;
        this.nameActivity = data.nameActivity;
        this.hazardActivity = data.hazardActivity;
        this.notification = data.notification;
        this.fineActivity = data.fineActivity;
    }
    static create(idActivity, nameActivity, hazardActivity, notification, fineActivity) {
        return new this({ idActivity, nameActivity, hazardActivity, notification, fineActivity });
    }
};
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT64)
], Activities.prototype, "idActivity", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UTF8)
], Activities.prototype, "nameActivity", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT8)
], Activities.prototype, "hazardActivity", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.BOOL)
], Activities.prototype, "notification", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT32)
], Activities.prototype, "fineActivity", void 0);
Activities = __decorate([
    ydbSDK.withTypeOptions({ namesConversion: ydbSDK.snakeToCamelCaseConversion })
], Activities);
module.exports = Activities;
