const Joi = require('joi');
const ApplicationError = require('./ApplicationError');

const getDTO = Joi.object({
    name: Joi.string().required(),
    offset: Joi.number().min(0).optional().default(0),
    limit: Joi.number().min(1).optional().default(20)
}).required()

const validateGetDTO = (dto) => {
    const { error, value } = getDTO.validate(dto);
    if (error) {
        throw new ApplicationError('Invalid input\r\n' + error.details[0].message, 400);
    }
    return value
}
module.exports = {
    validateGetDTO
};