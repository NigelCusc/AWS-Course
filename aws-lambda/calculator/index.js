const errorResponse = (message) => {
    return {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            message
        })
    }
}

exports.handler = async (event) => {
    let { operand1, operand2 } = event.input
    let result
    switch (event.operation) {
        case 'add':
            result = operand1 + operand2
            break
        case 'subtract':
            result = operand1 - operand2
            break
        default:
            return errorResponse('Unrecognized operation parameter. Operation must be add or subtract.')
    }
    let response = {
        result
    }
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*" // Make accessible to any website
        },
        body: JSON.stringify(response)
    };
}