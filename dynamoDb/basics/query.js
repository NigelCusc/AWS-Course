// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const { DynamoDB } = require("aws-sdk");
const AWS = require("aws-sdk")
AWS.config.update({ region: "eu-central-1" })

const documentClient = new AWS.DynamoDB.DocumentClient();

const happyIncOrgId = '81842ac4-ccfa-45bb-ba16-ea41099da7f2'
const projectX = '46eb6ac6-656a-40ce-bb24-2b59f5c15235'
const abcIncOrgId = '6700351c-4f8e-475d-9670-a47368027986'

// 5. Find all projects of Organisation
// var params = {
//     TableName: 'happy-projects',
//     KeyConditionExpression: '#PK = :PK and begins_with(#SK, :SK)',
//     ExpressionAttributeNames: { '#PK': 'PK', '#SK': 'SK' },
//     ExpressionAttributeValues: {
//         ':PK': 'ORG#6700351c-4f8e-475d-9670-a47368027986',
//         ':SK': 'PRO#'
//     }
// }

// documentClient.query(params, function (err, data) {
//     if (err) console.log(err);
//     else console.log(data);
// });

/*
    {
    Items: [
        {
        SK: 'PRO#agile#46eb6ac6-656a-40ce-bb24-2b59f5c15235',
        project_id: '46eb6ac6-656a-40ce-bb24-2b59f5c15235',
        PK: 'ORG#6700351c-4f8e-475d-9670-a47368027986',
        name: 'Project X'
        }
    ],
    Count: 1,
    ScannedCount: 1
    }
*/

console.log(`ORG#${abcIncOrgId}#PRO#${projectX}`)

// Find employees assigned to projectX of Happy INC
var params = {
    TableName: "happy-projects",
    KeyConditionExpression: "#PK = :PK",
    ExpressionAttributeNames: { "#PK": "PK" },
    ExpressionAttributeValues: {
        ":PK": `ORG#${happyIncOrgId}#PRO#${projectX}`
    }
}

documentClient.query(params, function (err, data) {
    if (err) console.log(err)
    else console.log(data)
})