// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const { v4: uuidv4 } = require('uuid')
const AWS = require("aws-sdk")
AWS.config.update({ region: "eu-central-1" })

const documentClient = new AWS.DynamoDB.DocumentClient();

// 1. Create an organisation (CREATE RECORD IN TABLE)
// const orgId = uuidv4()
// var params = {
//     TableName: 'happy-projects',
//     Item: {
//         PK: `ORG#${orgId}`,
//         SK: `#METADATA#${orgId}`,
//         name: 'ABC Inc',
//         tier: 'professional'
//     }
// };

// documentClient.put(params, function (err, data) {
//     if (err) console.log(err);
//     else console.log(data);
// });

const happyIncOrgId = "81842ac4-ccfa-45bb-ba16-ea41099da7f2"
const abcIncOrgId = "6700351c-4f8e-475d-9670-a47368027986"

// 2. Create a project in Happy Inc
const projectId = uuidv4()
var params = {
    TableName: 'happy-projects',
    Item: {
        PK: `ORG#${abcIncOrgId}`,
        SK: `PRO#react#${projectId}`,
        name: 'Project REACTUS',
        project_id: projectId
    }
};

documentClient.put(params, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
});