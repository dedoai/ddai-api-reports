const { Pool } = require('pg');
const { getDbSecretPwd } = require('./utils')

const getDbConnection = async () => {
    const pwd = await getDbSecretPwd()
    return new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        ssl: { rejectUnauthorized: false }
    })
}

module.exports = { getDbConnection }