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
import { formatHistory } from '../helpers/helperFunctions.js';
import OpenAI from 'openai';
import Message from '../schemas/Message.js';
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
    if (!('is_echo' in message)) {
        const askedTimestamp = new Date(Date.now());
        const conversationId = messageObj.sender.id + messageObj.recipient.id;
        const history = yield Message.find({ conversationId: conversationId });
        const formattedHistory = formatHistory(history);
        const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
        const completion = yield openai.chat.completions.create({
            messages: formattedHistory,
            model: "gpt-3.5-turbo"
        });
        const responseTimestamp = new Date(completion.created * 1000);
        const responseMessage = completion.choices[0].message.content;
        const records = [
            {
                conversationId: conversationId,
                role: 'user',
                message: msg,
                actionTs: askedTimestamp
            },
            {
                conversationId: conversationId,
                role: 'assistant',
                message: responseMessage,
                actionTs: responseTimestamp
            }
        ];
        // console.log(' records >>>> ', records)
        yield Message.insertMany(records);
        const obj = new BotModel(messageObj.sender.id);
        yield obj.sendMessage(String(responseMessage));
    }
    return 'BAHUR';
    //   } catch (err) {
    //     logger.error('%o', err)
    //     throw err
    //   }
});
export default textQuery;
