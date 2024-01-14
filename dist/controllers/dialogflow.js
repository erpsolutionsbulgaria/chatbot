var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import IfulfillmentObj from '../interfaces/IFulfillmentObj'
// import IStreamIdMappedData from '../interfaces/IStreamIdMappedData'
// import logger from '../utils/common.logger.js'
import { intentConsts } from '../constants.js';
import { DialogflowModel } from '../models/dialogflow.model.js';
// import detectIntent from './chatbot.js'
const processQuery = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { outputContexts, intent, queryText } = data.queryResult;
    let result = {
        fulfillmentMessages: [],
        outputContexts: [],
        followupEventInput: {}
    };
    const sessionStr = data.session.split('/');
    const sessionId = sessionStr[sessionStr.length - 1];
    // console.log('==========  ', sessionId, intent, queryText)
    const obj = new DialogflowModel(data, sessionId);
    switch (intent.displayName) {
        case intentConsts.WELCOME_INITIAL:
            result = yield obj.sendWelcome();
            break;
        case intentConsts.ORDER_LOOKUP_ORDER_NO_CONFIRM:
            result = yield obj.retrieveOrderData(queryText, sessionId);
            break;
    }
    return result;
});
export default processQuery;
