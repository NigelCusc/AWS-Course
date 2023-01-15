const { v4: uuidv4 } = require('uuid')
const AWS = require("aws-sdk")

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1" })

const _params = {
    TableName: 'notes'
}

const create = async (data) => {
    try {
        // const noteId = uuidv4()
        var params = {
            ..._params,
            Item: {
                notesId: data.id,
                title: data.title,
                body: data.body
            },
            ConditionExpression: "attribute_not_exists(title)"
        };
        await dynamodb.putItem(params).promise();
        // dynamodb.put(params, function (err, data) {
        //     if (err) console.log(err);
        //     else console.log(data);
        // });
        return {
            success: true,
            data
        }
    } catch (err) {
        return {
            success: false,
            message: err?.message,
            data
        }
    }
}

module.exports = {
    create
}