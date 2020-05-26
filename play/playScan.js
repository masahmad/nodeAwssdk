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
    region: "eu-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();



//endpoint: "http://localhost:8000"


// var params = {
//     TableName: "zMovies",
//     ProjectionExpression: "#yr, title, info.rating",
//     FilterExpression: "#yr between :start_yr and :end_yr",
//     ExpressionAttributeNames: {
//         "#yr": "year",
//     },
//     ExpressionAttributeValues: {
//          ":start_yr": 1950,
//          ":end_yr": 1959 
//     }
// };


var params = {
    TableName: "playTable2",
    ProjectionExpression: "sk, #d",
        ExpressionAttributeNames: {
        "#d": "Data",
    },
     
};


console.log("Scanning PlayTable.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(movie) {
            console.log('m', movie)
        //    console.log(
        //         movie.year + ": ",
        //         movie.title, "- rating:", movie);
        });

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}
