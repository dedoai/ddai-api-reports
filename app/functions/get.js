const { getDbConnection } = require('../db')
const { validateGetDTO } = require('../validators')

const get = async (getDTO) => {

    const value = validateGetDTO(getDTO);
    const { name, limit, offset } = value
    const db = await getDbConnection()
    const query = 'SELECT * FROM ' + name + ' OFFSET $1 LIMIT $2 '
    result = await db.query(query, [offset, limit])

    return result.rows.length === 1 ? result.rows[0] : result.rows
}

module.exports = {
    get
}