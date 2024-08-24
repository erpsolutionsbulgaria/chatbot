// const uuid = require('uuid')
// import { intentConsts, slotFillingConsts } from './constants.js'
// import { RegularBot } from '../models/RegularBot.js'
// import { mapAPInumber } from '../utils/apiStreamConfig.js'
import { BotModel } from '../models/bot.model.js'
// import IfulfillmentObj from '../interfaces/IFulfillmentObj'
// import IStreamIdMappedData from '../interfaces/IStreamIdMappedData'
// import logger from '../utils/common.logger.js'
import { intentConsts } from '../constants.js'
import { fulfillmentObj } from '../templates/response.js'
import IfulfillmentObj from '../interfaces/IFulfillmentObj'

import dialogflow from '@google-cloud/dialogflow'
import { DialogflowModel } from '../models/dialogflow.model.js'
// import detectIntent from './chatbot.js'

const processQuery = async (data: any): Promise<any> => {
  const { outputContexts, intent, queryText } = data.queryResult
  let result: IfulfillmentObj = {
    fulfillmentMessages: [],
    outputContexts: [],
    followupEventInput: {}
  }

  const sessionStr = data.session.split('/')
  const sessionId = sessionStr[sessionStr.length - 1]
  // console.log('==========  ', sessionId, intent, queryText)

  const obj = new DialogflowModel(data, sessionId)
  // switch (intent.displayName) {
  //   case intentConsts.WELCOME_INITIAL:
  //     result = await obj.sendWelcome(); break
  //   case intentConsts.ORDER_LOOKUP_ORDER_NO_CONFIRM:
  //     result = await obj.retrieveOrderData(queryText, sessionId); break
  // }

  return result
}

export default processQuery
