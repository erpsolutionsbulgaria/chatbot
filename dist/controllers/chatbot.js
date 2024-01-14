var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// const uuid = require('uuid')
// import { intentConsts, slotFillingConsts } from './constants.js'
// import { RegularBot } from '../models/RegularBot.js'
// import { mapAPInumber } from '../utils/apiStreamConfig.js'
import { BotModel } from '../models/bot.model.js';
// import IfulfillmentObj from '../interfaces/IFulfillmentObj'
// import IStreamIdMappedData from '../interfaces/IStreamIdMappedData'
// import logger from '../utils/common.logger.js'
import { intentConsts } from '../constants.js';
import dialogflow from '@google-cloud/dialogflow';
// Your credentials
const CREDENTIALS = {
    type: 'service_account',
    project_id: 'newagent-chlq',
    private_key_id: '87079b74d44bd5e50ce889857e6f3b10009e0cdd',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCHH6jA23VAiaiB\nRIJQbpPIlGwsbEJC4t3kCXYTrm2or/lct+wyq7PD1tAGsKUNYsiomG6pptgFJ7dM\noSvHd/PSBZzlaedapSxueQVxca+QM+z/QQG9TTW+TFNSXRErIBfQjF0IjbShA4Rr\nOHAp1QL6ASW9PrQsxhRNVetbb9/mVTCBC/7/MfkTHgp5ZDWUYUbGCEdwu6xiNdu/\nk36hTb42Jrflbdl1QPh+9HMczANqLuXpSXH/fdfy4N9x57QsbqDMxPaGW+deLMgj\nHmQBsw53VDwfFthrbasWCevooz4tsm4iUo8xXgt1jbU6EZ+/Tfan4cIBwCuJEdNa\nDs8i0SeJAgMBAAECgf8KbKbYOhYRpI0ba+2hxuYf01OFGdUC0/3KWfCCFDLhkLHs\nNURDpHt54FisK3SQU86nMxtWe0ivHSFHCCgYe2iUC1rPWBxBIf0LiMqiteKVfWwL\nRTidIhfDVqAW+pcYfKFZtXp37nbA9USCARimIYjZQL1onC3KRn3KeZZut3LOkic5\nL9tqzdpAloJVREA+V1+LtQg4UA4TAa9xtV93sJzr0dqEIjKVFX3i1eTVnvwoDZiL\n+j8actn4ZQzOyqlVuAqzev/LJ0SYrNxP8icgv71xS1buHCShVYr+uwQVKBUrb+1u\nyPP2RT6k+HrerTfmctNK3Exc6XAmk7cscMi0JYECgYEAutbZh807adXKwywb3pL+\nXqBikBDixcKs/VWeUOXmT/IkcLNFk2oXKCXcVDdUoPgLbebYz2ZjW0eSXrRXlcAw\n5UsPTPOFfUwUj745R/B28l8lVkOmitaiqPiyehfJ0A4ycFNuCv5RmUJFFFMqjVJC\nApALSRyiTMbNPDn6vBSCp0ECgYEAuSQq8PwGgYveeO75eoUNI/DB3zR91+LJjgoe\nb4BCvda0L2Yr+/QSK3h/bbSqVSCh0XLn+Qs7enq/qD3+sdi6eH4uNJqUzod9O8vb\n1w9ETXW2lS0bGdxhEUpngTMRnb4G1V32Mznfo+kzksR3wGriJNFgo12IJT02Hzf6\nszYX9kkCgYAtFYbsFAPQJ/yDV/Npo8Kphr4B0XFHExC3GJ/ZGYCXrfBJGZkiVyk7\nUNd3otpS9Uecv2V1tlknP3/8RjwUMIob6h7JDMIbV+5mORqNV2L8XSUfSbe4LM6X\nQ1udxnu2LpbRL/CPyopaFvmgS+kqrLys7aErhTNMn3QKolr0Y2abgQKBgE3B//sI\njp74JK78B3HK0dMHehWJ0VTLnkV2wIOqBd3/f9vseIqwXrU9PZ/Q4j0woGX8casq\naYeuaDJ8Hy2IzgBvVm6ngdogE5v6qdFwSwqRZubOc/Rvl6EQc9pSnZJ3zhztAstP\nAjuwZQW+WGFLQsGd4o2aaeTiCYohE70S+gtpAoGAbue6SFILrNPMW6aJ+OIZ1Ktt\nfzK9NAqanpxrvI1zIt2kKw7TCGZSjV44NzYEdSqkmh1M0tdY7auybAH4RETIyALH\nrRqvkiIegFrcQ6kqqyuRD8gxJWv40V+u/aF2sd/M7EBw5SM0FBwpyEu0RU89tXAx\ndrXPoYYn3A86kK9QS1o=\n-----END PRIVATE KEY-----\n',
    client_email: 'kiril-service-account@newagent-chlq.iam.gserviceaccount.com',
    client_id: '117670693972706007760',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/kiril-service-account%40newagent-chlq.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com'
};
// Your google dialogflow project-id
const PROJECID = CREDENTIALS.project_id;
// // Configuration for the client
const CONFIGURATION = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email
    }
};
// Create a new session
const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);
// // Detect intent method
export const detectIntent = (queryInput, sessionId, queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput,
        queryParams
    };
    // Send request and log result
    const responses = yield sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    const fulfillmentText = (result != null) ? result.fulfillmentText : 'null';
    const intentName = ((result === null || result === void 0 ? void 0 : result.intent) != null) ? result.intent.displayName : 'null';
    const fulfillmentMessages = result === null || result === void 0 ? void 0 : result.fulfillmentMessages;
    const contexts = (_a = responses[0].queryResult) === null || _a === void 0 ? void 0 : _a.outputContexts;
    return {
        fulfillmentMessages,
        fulfillmentText,
        intentName,
        contexts
    };
});
const textQuery = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const [messageEntry] = data.entry;
    const [messageObj] = messageEntry.messaging;
    const { message } = messageObj;
    let msg = '';
    if (message !== undefined) {
        const { text } = message;
        msg = text;
    }
    if (msg === undefined || msg === '') {
        return null;
    }
    console.log('====WWWWWWW', message);
    console.log(('is_echo' in message));
    if (!('is_echo' in message)) {
        console.log('====WWWWWWW>>>>>>', message);
        const queryObj = {
            text: {
                // The query to send to the dialogflow agent
                text: msg,
                // The language used by the client (en-US)
                languageCode: 'bg'
            }
        };
        const result = yield detectIntent(queryObj, messageObj.sender.id, {});
        const obj = new BotModel(messageObj.sender.id);
        console.log('>>>>>> ', result.intentName);
        switch (result.intentName) {
            // case intentConsts.ORDER_LOOKUP_ORDER_NO_CONFIRM: await obj.sendOffers(); break
            // case intentConsts.WELCOME_INITIAL: await obj.sendOffers(); break
            case intentConsts.SPECIAL_OFFERS:
                yield obj.sendOffers();
                break;
            case intentConsts.WELCOME_INITIAL_FAQ:
            case intentConsts.DEFAULT_WELCOME_WISMO:
                yield obj.sendWelcomeIntent(result.fulfillmentMessages);
                break;
            // case intentConsts.ORDER_LOOKUP_ORDER_NO_CONFIRM:
            //   await obj.retrieveOrderData(msg, messageObj.sender.id); break // result.fulfillmentMessages
        }
    }
    return 'BAHUR';
    //   } catch (err) {
    //     logger.error('%o', err)
    //     throw err
    //   }
});
export default textQuery;
