'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.getPersonalityData = exports.getLocationsData = exports.getActivitiesData = exports.getViolationChartersData = exports.getUsersData = exports.getSkudData = void 0;

const Personality = require('./models/personality');
const Locations = require('./models/locations');
const Activities = require('./models/activities');
const Violation_Charters = require('./models/violation_charters');
const Users = require('./models/users');
const Skud = require('./models/skud');

/**
 * @desc randomTodayTimeGenerator - generates random time intervals from the date and time of function generation in a given range
 */
function rttGen(min, max) {
    function getRandomInt(miN, maX) {
        miN = Math.ceil(miN);
        maX = Math.floor(maX);
        return Math.floor(Math.random() * (maX - miN)) + miN;
    }
    let d = new Date()
    d.setHours(d.getHours() + getRandomInt(min, max),d.getMinutes() + getRandomInt(min, max) + getRandomInt(min, max));
    return d;
}

function getPersonalityData() {
    return Personality.asTypedCollection([
        Personality.create(51116387928887, 1, 1, 1,36.6, new Date("2006-02-03")),
        Personality.create(32838118972656, 3, 3, 1,35.6, new Date("2006-02-03")),
        Personality.create(35210933387152, 2, 1, 1,36.4, new Date("2006-02-03")),
        Personality.create(44942411679400, 1, 2, 3,36.5, new Date("2006-02-03")),
        Personality.create(40057957250489, 3, 3, 1,35.9, new Date("2006-02-03")),
    ]);
}
exports.getPersonalityData = getPersonalityData;

function getLocationsData() {
    return Locations.asTypedCollection([
        Locations.create(1,"Главный корпус","346428, Ростовская обл., г. Новочеркасск, ул. Просвещения, 132","47.416614, 40.086592"),
        Locations.create(2,"Горный корпус","346428, Ростовская обл., г. Новочеркасск, ул. Просвещения, 132","47.417595, 40.083563"),
        Locations.create(3,"Общежитие 11","346428, Ростовская обл., г. Новочеркасск, ул. Энгельса, 85А","47.416812, 40.074263"),
    ]);
}
exports.getLocationsData = getLocationsData;

function getActivitiesData() {
    return Activities.asTypedCollection([
        Activities.create(1,"Идет",0, false, 0),
        Activities.create(2,"Сидит",0, false, 0),
        Activities.create(3,"Курит",5, true, 1500),
    ]);
}
exports.getActivitiesData = getActivitiesData;

function getViolationChartersData() {
    return Violation_Charters.asTypedCollection([
        Violation_Charters.create(1,"Все хорошо",0),
        Violation_Charters.create(2,"Неудовлетворяющая одежда",1),
        Violation_Charters.create(3,"Холодное оружие",3),
    ]);
}
exports.getViolationChartersData = getViolationChartersData;

function getUsersData() {
    return Users.asTypedCollection([
        Users.create(1,150833946,1832123,13021,"3225764451",32838118972656,"Абрамов Николай Федорович",new Date("1996-22-10"),"М"),
        Users.create(2,100833333,0,14231,"6021114451",51116387928887,"Анисимова Анастасия Алексадровна",new Date("1970-11-03"),"Ж"),
        Users.create(3,150833946,1842223,0,"9021212333",44942411679400,"Кикиморов Георгий Михайлович",new Date("1996-22-11"),"М"),
        Users.create(4,112833232,1123423,0,"3212112452",35210933387152,"Полякова Мария Валентиновна",new Date("1998-12-23"),"Ж"),
        Users.create(5,151233453,2123623,0,"5652112452",40057957250489,"Георова Тамара Петровна",new Date("2001-22-07"),"Ж"),
    ]);
}
exports.getUsersData = getUsersData;

function getSkudData() {
    return Skud.asTypedCollection([
        Skud.create(1,150833946, rttGen(-15,5), rttGen(0,8)),
        Skud.create(2,150833946, rttGen(-15,5), rttGen(0,8)),
        Skud.create(3,150833946, rttGen(-15,5), rttGen(0,8)),
        Skud.create(4,112833232, rttGen(-15,5), rttGen(0,8)),
        Skud.create(5,112833232, rttGen(-15,5), rttGen(0,8)),
        Skud.create(6,150833946, rttGen(-15,5), rttGen(0,8)),
        Skud.create(7,112833232, rttGen(-15,5), rttGen(0,8)),
        Skud.create(8,151233453, rttGen(-15,5), rttGen(0,8)),
        Skud.create(9,150833946, rttGen(-15,5), rttGen(0,8)),
        Skud.create(10,151233453, rttGen(-15,5), rttGen(0,8)),
    ]);
}
exports.getSkudData = getSkudData;
