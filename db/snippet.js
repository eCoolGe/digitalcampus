'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.run = void 0;
const ydbSDK = require('ydb-sdk');
const utils = require('./utils');
const data_helpers = require('./data-helpers');

const PERSONALITY_TABLE = 'personality';
const LOCATIONS_TABLE = 'locations';
const ACTIVITIES_TABLE = 'activities';
const VIOLATION_CHARTERS_TABLE = 'violation_charters';
const USERS_TABLE = 'users';
const SKUD_TABLE = 'skud';

async function createTables(session, logger) {
    logger.info('Dropping old tables...');
    await session.dropTable(PERSONALITY_TABLE);
    await session.dropTable(LOCATIONS_TABLE);
    await session.dropTable(ACTIVITIES_TABLE);
    await session.dropTable(VIOLATION_CHARTERS_TABLE);
    await session.dropTable(USERS_TABLE);
    await session.dropTable(SKUD_TABLE);
    logger.info('Creating tables...');
    await session.createTable(PERSONALITY_TABLE, new ydbSDK.TableDescription()
        .withColumn(new ydbSDK.Column('personality_data', ydbSDK.Types.optional(ydbSDK.Types.INT64)))
        .withColumn(new ydbSDK.Column('id_location', ydbSDK.Types.optional(ydbSDK.Types.UINT64)))
        .withColumn(new ydbSDK.Column('id_activity', ydbSDK.Types.optional(ydbSDK.Types.UINT64)))
        .withColumn(new ydbSDK.Column('id_violation_charter', ydbSDK.Types.optional(ydbSDK.Types.UINT64)))
        .withColumn(new ydbSDK.Column('temperature_personality', ydbSDK.Types.optional(ydbSDK.Types.DOUBLE)))
        .withColumn(new ydbSDK.Column('datetime_personality', ydbSDK.Types.optional(ydbSDK.Types.DATETIME)))
        .withPrimaryKey('personality_data'));
    await session.createTable(LOCATIONS_TABLE, new ydbSDK.TableDescription()
        .withColumn(new ydbSDK.Column('id_location', ydbSDK.Types.optional(ydbSDK.Types.UINT64)))
        .withColumn(new ydbSDK.Column('name_location', ydbSDK.Types.optional(ydbSDK.Types.UTF8)))
        .withColumn(new ydbSDK.Column('address_location', ydbSDK.Types.optional(ydbSDK.Types.UTF8)))
        .withColumn(new ydbSDK.Column('coords_location', ydbSDK.Types.optional(ydbSDK.Types.UTF8)))
        .withPrimaryKey('id_location'));
    await session.createTable(ACTIVITIES_TABLE, new ydbSDK.TableDescription()
        .withColumn(new ydbSDK.Column('id_activity', ydbSDK.Types.optional(ydbSDK.Types.UINT64)))
        .withColumn(new ydbSDK.Column('name_activity', ydbSDK.Types.optional(ydbSDK.Types.UTF8)))
        .withColumn(new ydbSDK.Column('hazard_activity', ydbSDK.Types.optional(ydbSDK.Types.UINT8)))
        .withColumn(new ydbSDK.Column('notification', ydbSDK.Types.optional(ydbSDK.Types.BOOL)))
        .withColumn(new ydbSDK.Column('fine_activity', ydbSDK.Types.optional(ydbSDK.Types.UINT32)))
        .withPrimaryKey('id_activity'));
    await session.createTable(VIOLATION_CHARTERS_TABLE, new ydbSDK.TableDescription()
        .withColumn(new ydbSDK.Column('id_violation_charter', ydbSDK.Types.optional(ydbSDK.Types.UINT64)))
        .withColumn(new ydbSDK.Column('name_violation_charter', ydbSDK.Types.optional(ydbSDK.Types.UTF8)))
        .withColumn(new ydbSDK.Column('type_violation_charter', ydbSDK.Types.optional(ydbSDK.Types.UINT64)))
        .withPrimaryKey('id_violation_charter'));
    await session.createTable(USERS_TABLE, new ydbSDK.TableDescription()
        .withColumn(new ydbSDK.Column('id_user', ydbSDK.Types.optional(ydbSDK.Types.UINT64)))
        .withColumn(new ydbSDK.Column('id_pass', ydbSDK.Types.optional(ydbSDK.Types.UINT64)))
        .withColumn(new ydbSDK.Column('id_gradebook', ydbSDK.Types.optional(ydbSDK.Types.UINT64)))
        .withColumn(new ydbSDK.Column('id_employee', ydbSDK.Types.optional(ydbSDK.Types.UINT64)))
        .withColumn(new ydbSDK.Column('passport', ydbSDK.Types.optional(ydbSDK.Types.UTF8)))
        .withColumn(new ydbSDK.Column('personality_data', ydbSDK.Types.optional(ydbSDK.Types.INT64)))
        .withColumn(new ydbSDK.Column('fio', ydbSDK.Types.optional(ydbSDK.Types.UTF8)))
        .withColumn(new ydbSDK.Column('birth_date', ydbSDK.Types.optional(ydbSDK.Types.DATE)))
        .withColumn(new ydbSDK.Column('gender', ydbSDK.Types.optional(ydbSDK.Types.UTF8)))
        .withPrimaryKeys('id_user', 'id_pass', 'id_gradebook', 'id_employee', 'passport', 'personality_data'));
    await session.createTable(SKUD_TABLE, new ydbSDK.TableDescription()
        .withColumn(new ydbSDK.Column('id_skud', ydbSDK.Types.optional(ydbSDK.Types.UINT64)))
        .withColumn(new ydbSDK.Column('id_pass', ydbSDK.Types.optional(ydbSDK.Types.UINT64)))
        .withColumn(new ydbSDK.Column('datetime_entry', ydbSDK.Types.optional(ydbSDK.Types.DATETIME)))
        .withColumn(new ydbSDK.Column('datetime_exit', ydbSDK.Types.optional(ydbSDK.Types.DATETIME)))
        .withPrimaryKey('id_skud'));
    logger.info('Tables has been created');
}

async function fillTablesWithData(session, logger) {
    const query = `
${utils.SYNTAX_V1}

DECLARE $personalityData AS List<Struct<
    personality_data: Int64,
    id_location: Uint64,
    id_activity: Uint64,
    id_violation_charter: Uint64,
    temperature_personality: Double,
    datetime_personality: Datetime>>;
DECLARE $locationsData AS List<Struct<
    id_location: Uint64,
    name_location: Utf8,
    address_location: Utf8,
    coords_location: Utf8>>;
DECLARE $activitiesData AS List<Struct<
    id_activity: Uint64,
    name_activity: Utf8,
    hazard_activity: Uint8,
    notification: Bool,
    fine_activity: Uint32>>;
DECLARE $violationChartersData AS List<Struct<
    id_violation_charter: Uint64,
    name_violation_charter: Utf8,
    type_violation_charter: Uint64>>;
DECLARE $usersData AS List<Struct<
    id_user: Uint64,
    id_pass: Uint64,
    id_gradebook: Uint64,
    id_employee: Uint64,
    passport: Utf8,
    personality_data: Int64,
    fio: Utf8,
    birth_date: Date,
    gender: Utf8>>;
DECLARE $skudData AS List<Struct<
    id_skud: Uint64,
    id_pass: Uint64,
    datetime_entry: Datetime,
    datetime_exit: Datetime>>;

REPLACE INTO ${PERSONALITY_TABLE}
SELECT
    personality_data,
    id_location,
    id_activity,
    id_violation_charter,
    temperature_personality,
    datetime_personality
FROM AS_TABLE($personalityData);

REPLACE INTO ${LOCATIONS_TABLE}
SELECT
    id_location,
    name_location,
    address_location,
    coords_location
FROM AS_TABLE($locationsData);

REPLACE INTO ${ACTIVITIES_TABLE}
SELECT
    id_activity,
    name_activity,
    hazard_activity,
    notification,
    fine_activity
FROM AS_TABLE($activitiesData);

REPLACE INTO ${VIOLATION_CHARTERS_TABLE}
SELECT
    id_violation_charter,
    name_violation_charter,
    type_violation_charter
FROM AS_TABLE($violationChartersData);

REPLACE INTO ${USERS_TABLE}
SELECT
    id_user,
    id_pass,
    id_gradebook,
    id_employee,
    passport,
    personality_data,
    fio,
    birth_date,
    gender
FROM AS_TABLE($usersData);

REPLACE INTO ${SKUD_TABLE}
SELECT
    id_skud,
    id_pass,
    datetime_entry,
    datetime_exit
FROM AS_TABLE($skudData);
`;
    async function fillTable() {
        logger.info('Inserting data to tables, preparing query...');
        const preparedQuery = await session.prepareQuery(query);
        logger.info('Query has been prepared, executing...');
        await session.executeQuery(preparedQuery, {
            '$personalityData': data_helpers.getPersonalityData(),
            '$locationsData': data_helpers.getLocationsData(),
            '$activitiesData': data_helpers.getActivitiesData(),
            '$violationChartersData': data_helpers.getViolationChartersData(),
            '$usersData': data_helpers.getUsersData(),
            '$skudData': data_helpers.getSkudData()
        });
        logger.info('Executing completed');
    }
    await ydbSDK.withRetries(fillTable);
}

async function selectSimple(session, logger) {
    const query = `
${utils.SYNTAX_V1}
SELECT e.title, s.title
FROM episodes AS e
FULL JOIN seasons AS s 
USING (series_id);`;
    logger.info('Making a simple select...');
    const { resultSets } = await session.executeQuery(query);
    const result = data_helpers.Table.createNativeObjects(resultSets[0]);
    console.log(`selectSimple result: ${JSON.stringify(result, null, 2)}`);
}

async function readTable(table_name, session, logger, settings) {
    await session.streamReadTable(table_name, (result) => {
        const resultSet = result.resultSet;
        if (resultSet) {
            const table = data_helpers.Table.createNativeObjects(resultSet);
            // console.log(table);
            table.forEach((table) => {
                if (table_name === 'orders') {
                    console.log(`#  Order, CustomerId: ${table.customerId}, OrderId: ${table.orderId}, Description: ${table.description}, Order date: ${table.orderDate}`);
                }
                if (table_name === 'users') {
                    console.log(`#  Users, Id: ${table.id}, Login: ${table.login}`);
                }
            });
        }
    }, settings);
}

async function run(logger, endpoint, database, args) {
    // logger.info('Driver initializing...');
    // const authService = ydbSDK.getCredentialsFromEnv();
    // const driver = new ydbSDK.Driver({ endpoint, database, authService });
    // const timeout = 10000;
    // if (!await driver.ready(timeout)) {
    //     logger.fatal(`Driver has not become ready in ${timeout}ms!`);
    //     process.exit(1);
    // }
    // logger.info('Done');

    logger.info('Driver initializing...');
    const saKeyFile = args.serviceAccountKeyFile;
    const saCredentials = ydbSDK.getSACredentialsFromJson(saKeyFile);
    const authService = new ydbSDK.IamAuthService(saCredentials);
    const driver = new ydbSDK.Driver({ endpoint, database, authService });
    const timeout = 10000;
    if (!await driver.ready(timeout)) {
        logger.fatal(`Driver has not become ready in ${timeout}ms!`);
        process.exit(1);
    }
    logger.info('Done');



    await driver.tableClient.withSession(async (session) => {
        await createTables(session, logger);
        await fillTablesWithData(session, logger);
    });

    // await driver.tableClient.withSession(async (session) => {
    //     logger.info('Read whole table, unsorted:');
    //
    //     await readTable('orders', session, logger);
    //     await readTable('users', session, logger);
    //     // await selectSimple(session, logger);
    // });

    await driver.destroy();
}

exports.run = run;
exports.options = [{
    key: 'serviceAccountKeyFile',
    name: 'service-account-key-file',
    description: 'service account key file for YDB authenticate',
}];
