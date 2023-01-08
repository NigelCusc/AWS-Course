const moment = require("moment/moment");

const greeting = {
    'en': 'Hello',
    'fr': 'Bonjour',
    'hi': 'Namaste',
    'es': 'Hola'
}

exports.handler = async (event) => {
    // Context https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html
    const name = event.pathParameters.name;
    const {lang, ... info} = event.queryStringParameters || '';
    let message = `${greeting[lang] ? greeting[lang] : greeting['en'] } ${name}`
    let response = {
        message,
        info,
        timestamp: moment().unix()
    }
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*" // Make accessible to any website
        },
        body: JSON.stringify(response)
    };
}