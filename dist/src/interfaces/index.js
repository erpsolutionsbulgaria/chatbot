"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import the packages we need
const dialogflow = require('@google-cloud/dialogflow');
require('dotenv').config();
const express = require('express');
// Your credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
// Other way to read the credentials
// const fs = require('fs');
// const CREDENTIALS = JSON.parse(fs.readFileSync('File path'));
// Your google dialogflow project-id
const PROJECID = CREDENTIALS.project_id;
// Configuration for the client
const CONFIGURATION = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email
    }
};
// Create a new session
const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);
// Detect intent method
const detectIntent = (languageCode, queryText, sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: queryText,
                // The language used by the client (en-US)
                languageCode
            }
        }
    };
    // Send request and log result
    const responses = yield sessionClient.detectIntent(request);
    console.log(responses);
    const result = responses[0].queryResult;
    console.log(result);
    return {
        response: result.fulfillmentText
    };
});
