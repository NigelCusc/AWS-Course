const { CognitoJwtVerifier } = require('aws-jwt-verify')

const jwtVerifier = CognitoJwtVerifier.create({
    userPoolId: 'eu-central-1_dcrm4Zr8H',
    tokenUse: 'id',
    clientId: 'tm9r890q90ughsqor35lb67ou'
})


const generatePolicy = (principalId, effect, resource) => {
    var authResponse = {}
    authResponse.principalId = principalId;
    if (effect && resource) {
        // IAM policy document
        let policyDocument = {
            Version: "2012-10-17",
            Statement: [
                {
                    Effect: effect,
                    Resource: resource,
                    Action: "execute-api:Invoke"
                }
            ]
        }
        authResponse.policyDocument = policyDocument;
    }
    authResponse.context = {
        foo: 'bar'
    }
    console.log(JSON.stringify(authResponse))
    return authResponse;
}

exports.handler = async (event, context, callback) => {
    try{
        // Lambda authorizer code
        var token = event.authorizationToken;
        console.log({ token })
        // Validate the token
        const payload = await jwtVerifier.verify(token)
        console.log(JSON.stringify(payload))
        return generatePolicy('user', 'Allow', event.methodArn)
    } catch (err) {
        console.log("Error: " + err)
        return generatePolicy('user', 'Deny', event.methodArn)
    }
}