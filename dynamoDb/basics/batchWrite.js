const { v4: uuidv4 } = require('uuid')
const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-central-1' })

const documentClient = new AWS.DynamoDB.DocumentClient();

const happyIncOrgId = '81842ac4-ccfa-45bb-ba16-ea41099da7f2'
const abcIncOrgId = '6700351c-4f8e-475d-9670-a47368027986'

// Create Employees
const employeeArray = [
    {
        orgId: abcIncOrgId,
        projectIds: ['46eb6ac6-656a-40ce-bb24-2b59f5c15235'],
        name: 'Nigel Dodo',
        email: 'nigel.dodo@dodo.com'
    },
    {
        orgId: abcIncOrgId,
        projectIds: ['46eb6ac6-656a-40ce-bb24-2b59f5c15235', 'cace8c1f-a1d4-4398-852f-fe693ea7b866'],
        name: 'Micheal Dodo',
        email: 'micheal.dodo@dodo.com'
    },
    {
        orgId: abcIncOrgId,
        projectIds: ['46eb6ac6-656a-40ce-bb24-2b59f5c15235', 'cace8c1f-a1d4-4398-852f-fe693ea7b866', '059ce312-1a48-474c-9bf6-46b1107a5066'],
        name: 'Jason Dodo',
        email: 'jason.dodo@dodo.com'
    },
    {
        orgId: happyIncOrgId,
        projectIds: ['2cb0bf0a-4018-419c-879c-568588a70dd9'],
        name: 'Lanius Dodo',
        email: 'lanius.dodo@dodo.com'
    },
    {
        orgId: happyIncOrgId,
        projectIds: ['efdf9cc3-0f99-4fcc-bff3-6d564fbf62c5', '2cb0bf0a-4018-419c-879c-568588a70dd9'],
        name: 'Butcher Dodo',
        email: 'butcher.dodo@dodo.com'
    },
    {
        orgId: happyIncOrgId,
        projectIds: ['efdf9cc3-0f99-4fcc-bff3-6d564fbf62c5', '2cb0bf0a-4018-419c-879c-568588a70dd9'],
        name: 'Angus Dodo',
        email: 'angus.dodo@dodo.com'
    },
    {
        orgId: happyIncOrgId,
        projectIds: ['efdf9cc3-0f99-4fcc-bff3-6d564fbf62c5'],
        name: 'Ribeye Dodo',
        email: 'ribeye.dodo@dodo.com'
    },
]

const employeeRows = []

for (let i = 0; i < employeeArray.length; i++) {
    const id = uuidv4() // EMPLOYEE ID
    const { name, email, projectIds } = employeeArray[i]
    // PRIMARY INDEXES
    employeeRows.push({
        PutRequest: {
            Item: {
                PK: `ORG#${happyIncOrgId}`,
                SK: `EMP#${id}`,
                name,
                email
            }
        }
    })
    // CREATE SECONDARY INDEXES
    for (let j = 0; j < projectIds.length; j++) {
        employeeRows.push({
            PutRequest: {
                Item: {
                    PK: `ORG#${happyIncOrgId}#PRO#${projectIds[j]}`,
                    SK: `ORG#${happyIncOrgId}#EMP#${id}`,
                    date_of_join: new Date().toUTCString()
                }
            }
        })
    }
}

// Dynamo db has a 25 batch limit
const batchSize = 25
const batches = []
while (employeeRows.length > 0) {
    batches.push(employeeRows.splice(0, batchSize))
}

for (let i = 0; i < batches.length; i++) {
    const params = {
        RequestItems: {
            'happy-projects': batches[i]
        }
    }

    documentClient.batchWrite(params, function (err, data) {
        if (err) {
            console.log('err', err);
        } else {
            console.log('data', data);
        }
    });
}
