// const uuid = require('uuid')
// import { intentConsts, slotFillingConsts } from './constants.js'
// import { RegularBot } from '../models/RegularBot.js'
// import { mapAPInumber } from '../utils/apiStreamConfig.js'
import { BotModel } from '../models/bot.model.js'
import { formatHistory } from '../helpers/helperFunctions.js'
// import IfulfillmentObj from '../interfaces/IFulfillmentObj'
// import IStreamIdMappedData from '../interfaces/IStreamIdMappedData'
// import logger from '../utils/common.logger.js'
import { intentConsts } from '../constants.js'
import OpenAI from 'openai';
import Message from '../schemas/Message.js';

import dialogflow, { ConversationProfilesClient } from '@google-cloud/dialogflow'

const textQuery = async (data: any): Promise<any> => {
  const [messageEntry] = data.entry
  const [messageObj] = messageEntry.messaging
  const { message } = messageObj
  let msg = ''

  if (message !== undefined) {
    const { text } = message
    msg = text
  }

  if (msg === undefined || msg === '') {
    return null
  }

  if (!('is_echo' in message)) {
    const askedTimestamp: Date = new Date(Date.now())
    const conversationId = messageObj.sender.id + messageObj.recipient.id
    const history = await Message.find({ conversationId: conversationId });
    const formattedHistory = formatHistory(history)
    
    const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
    const completion = await openai.chat.completions.create({
      messages: formattedHistory,
      model: "gpt-3.5-turbo"
    });

    const responseTimestamp: Date = new Date(completion.created * 1000)
    const responseMessage = completion.choices[0].message.content
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

    await Message.insertMany(records);

    const obj = new BotModel(messageObj.sender.id)
    await obj.sendMessage(String(responseMessage));
  }
  return 'BAHUR'
//   } catch (err) {
//     logger.error('%o', err)
//     throw err
//   }
}

export default textQuery
