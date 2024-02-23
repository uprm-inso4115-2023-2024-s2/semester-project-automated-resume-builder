import {dbConfig} from './config.js';
import pkg from 'pg';
const {Pool} = pkg;

const pool = new Pool({
    user: dbConfig.user,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database
})

export default pool