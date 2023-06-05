const AWS = require("aws-sdk")

const dynamodb = new AWS.DynamoDB.DocumentClient({
    region: "eu-central-1",
    maxRetries: 3,
    httpOptions: {
        timeout: 5000
    }
})

const _params = {
    TableName: process.env.NOTES_TABLE_NAME || 'notes'
}

const send = (statusCode, data) => {
    return {
        statusCode,
        body: JSON.stringify(data)
    }
}

const create = async (data) => {
    var params = {
        ..._params,
        Item: {
            notesId: data.id,
            title: data.title,
            body: data.body
        },
        ConditionExpression: "attribute_not_exists(title)"
    };
    await dynamodb.put(params).promise();
}

const update = async (notesId, data) => {
    var params = {
        ..._params,
        Key: { notesId },
        UpdateExpression: "set #title = :title, #body = :body",
        ExpressionAttributeNames: {
            '#title': 'title',
            '#body': 'body'
        },
        ExpressionAttributeValues: {
            ':title': data.title,
            ':body': data.body
        },
        ConditionExpression: 'attribute_exists(notesId)'
    };
    await dynamodb.update(params).promise();
}

const deleteNote = async (notesId) => {
    var params = {
        ..._params,
        Key: { notesId },
        ConditionExpression: 'attribute_exists(notesId)'
    };
    await dynamodb.delete(params).promise();
}

const getAllNotes = async () => {
    var params = {
        ..._params,
    };
    return await dynamodb.scan(params).promise();
}

module.exports = {
    create,
    update,
    send,
    deleteNote,
    getAllNotes
}