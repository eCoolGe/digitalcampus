"use strict";
let __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYNTAX_V1 = exports.main = void 0;
const ydbSDK = require("ydb-sdk");
const yargs = __importDefault(require("yargs"));
async function main(runner, options) {
    const optionsUsage = options && options.length > 0 ? options.map((option) => ` --${option.name}`).join('') : '';
    const argsBuilder = yargs.default
        .usage(`Usage: $0 (--db <database> --endpoint <endpoint> or --connection-string <connection_string>)${optionsUsage}`);
    argsBuilder.options({
        'db': { describe: 'YDB database name', type: 'string' },
        'endpoint': { describe: 'YDB database endpoint', type: 'string' },
        'connection-string': { describe: 'YDB connection string', type: 'string' },
    });
    options === null || options === void 0 ? void 0 : options.forEach((option) => {
        argsBuilder.option(option.name, {
            describe: option.description,
            type: 'string',
            demandOption: true,
        });
    });
    const args = argsBuilder.argv;
    const endpointParam = args.endpoint;
    const dbParam = args.db;
    const connectionStringParam = args.connectionString;
    let endpoint;
    let db;
    if (connectionStringParam) {
        const parsedConnectionString = ydbSDK.parseConnectionString(connectionStringParam);
        endpoint = parsedConnectionString.endpoint;
        db = parsedConnectionString.database;
    }
    else if (endpointParam && dbParam) {
        endpoint = endpointParam;
        db = dbParam;
    }
    else {
        throw new Error('Either --connection-string <connection_string> or --db <database> --endpoint <endpoint> arguments are required');
    }
    const cliParams = {};
    options === null || options === void 0 ? void 0 : options.forEach((option) => {
        cliParams[option.key] = args[option.key];
    });
    const logger = ydbSDK.getLogger();
    logger.info(`Running basic-example script against endpoint '${endpoint}' and database '${db}'.`);
    try {
        await runner(logger, endpoint, db, cliParams);
    }
    catch (error) {
        logger.error(error);
    }
}
exports.main = main;
exports.SYNTAX_V1 = '--!syntax_v1';
