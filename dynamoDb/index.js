// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const { v4: uuidv4 } = require('uuid')
const AWS = require("aws-sdk")
AWS.config.update({ region: "eu-central-1" })

const documentClient = new AWS.DynamoDB.DocumentClient();
const happyIncOrgId = "6700351c-4f8e-475d-9670-a47368027986"


// 5. Find all projects of Organisation
var params = {
    TableName: 'happy-projects',
    KeyConditionExpression: '#PK = :PK and begins_with(#SK, :SK)',
    ExpressionAttributeNames: { '#PK': 'PK', '#SK': 'SK' },
    ExpressionAttributeValues: {
        ':PK': 'ORG#6700351c-4f8e-475d-9670-a47368027986',
        ':SK': 'PRO#'
    }
}

documentClient.query(params, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
});