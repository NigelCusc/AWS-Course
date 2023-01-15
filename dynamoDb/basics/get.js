// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const AWS = require("aws-sdk")
AWS.config.update({ region: "eu-central-1" })

const documentClient = new AWS.DynamoDB.DocumentClient();

// 4. Find an Organisation(GET)
var params = {
    TableName: 'happy-projects',
    Key: {
        PK: "ORG#6700351c-4f8e-475d-9670-a47368027986",
        SK: "#METADATA#6700351c-4f8e-475d-9670-a47368027986"
    }
}

documentClient.get(params, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
});