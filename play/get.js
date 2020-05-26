/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
var AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-west-2",
    });

var dynamoDb = new AWS.DynamoDB.DocumentClient({

});



const getItem = async data => {

    const params = {
        TableName: 'playTable',
        Key: {
            PK: 'user_1234',
            SK: 'profile'
        }
    }

    const result = await dynamoDb.get(params).promise()
    return result.item

}



getItem().then(x => {
    console.log('x',x)
})


