const { get } = require('./functions/get')
const { responseDTO } = require('./utils')
const ApplicationError = require('./ApplicationError')
const { validate } = require('./validator')
const { getDTO } = require('./validatorSchemas/get')

exports.handler = async (event) => {

    const { httpMethod } = event.requestContext
    let result;
    let validatedInput;
    try {
        switch (httpMethod) {
            case 'GET':
                console.log(`get request received with params: `, JSON.stringify(event.queryStringParameters))
                validatedInput = validate(event.queryStringParameters, getDTO)
                result = await get(validatedInput)
                return responseDTO(200, result)
            default:
                return responseDTO(405, 'Method not allowed')
        }
    }
    catch (err) {
        console.log('----------------------EXCEPTION OCCURRED----------------------')
        console.log(JSON.stringify(err))
        console.log(err.message)
        console.log('----------------------EXCEPTION END---------------------------')
        if (err instanceof ApplicationError) {
            return responseDTO(err.statusCode, err.message)
        }
        else
            return responseDTO(500, 'Internal Server Error')
    }
}