const { get } = require('./functions/get')
const { manageResponse, transformInput } = require('./utils')
const ApplicationError = require('./ApplicationError')
const { validate } = require('./validator')
const { getDTO } = require('./validatorSchemas/get')
const { TRANSFORM_FORMATS } = require('./constants')

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
                return manageResponse(200, transformInput(result, TRANSFORM_FORMATS.camel))
            default:
                return manageResponse(405)
        }
    }
    catch (err) {
        console.log('----------------------EXCEPTION OCCURRED----------------------')
        console.log(JSON.stringify(err))
        console.log(err.message)
        console.log('----------------------EXCEPTION END---------------------------')
        if (err instanceof ApplicationError) {
            return manageResponse(err.statusCode, err.message)
        }
        else
            return manageResponse(500, 'Internal Server Error')
    }
}