"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ydbSDK = require("ydb-sdk");
let __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class Users extends ydbSDK.TypedData {
    constructor(data) {
        super(data);
        this.idUser = data.idUser;
        this.idPass = data.idPass;
        this.idGradebook = data.idGradebook;
        this.idEmployee = data.idEmployee;
        this.passport = data.passport;
        this.personalityData = data.personalityData;
        this.fio = data.fio;
        this.birthDate = data.birthDate;
        this.gender = data.gender;
    }
    static create(idUser, idPass, idGradebook, idEmployee, passport, personalityData, fio, birthDate, gender) {
        return new this({ idUser, idPass, idGradebook, idEmployee, passport, personalityData, fio, birthDate, gender });
    }
};
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT64)
], Users.prototype, "idUser", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT64)
], Users.prototype, "idPass", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT64)
], Users.prototype, "idGradebook", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UINT64)
], Users.prototype, "idEmployee", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UTF8)
], Users.prototype, "passport", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.INT64)
], Users.prototype, "personalityData", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UTF8)
], Users.prototype, "fio", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.DATE)
], Users.prototype, "birthDate", void 0);
__decorate([
    ydbSDK.declareType(ydbSDK.Types.UTF8)
], Users.prototype, "gender", void 0);
Users = __decorate([
    ydbSDK.withTypeOptions({ namesConversion: ydbSDK.snakeToCamelCaseConversion })
], Users);
module.exports = Users;
