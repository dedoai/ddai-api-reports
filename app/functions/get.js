const { getDbConnection } = require('../db')
const { queries } = require('../queries')
const get = async (input) => {
    const { name, limit, offset } = input
    const db = await getDbConnection()
    result = await db.query(queries[name], [offset, limit])
    await db.end()
    return result.rows
}

module.exports = {
    get
}