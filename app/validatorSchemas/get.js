const Joi = require('joi');
const { MAX_LIMIT, MAX_OFFSET, DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../constants')
const { queries } = require('../queries')
const getDTO = Joi.object({
    name: Joi.string().valid(...Object.keys(queries)).required(),
    offset: Joi.number().integer().min(0).max(MAX_OFFSET).optional().default(DEFAULT_OFFSET),
    limit: Joi.number().integer().min(1).max(MAX_LIMIT).optional().default(DEFAULT_LIMIT)
}).required()

module.exports = {
    getDTO
}