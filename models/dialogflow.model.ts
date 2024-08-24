import axios from 'axios'

// import { detectIntent } from '../controllers/chatbot.js'

// import IQuickReplyObj from '../interfaces/IQuickReplyObj'

import { fulfillmentObj } from '../templates/response.js'

// function constructValues (response: any): IQuickReplyObj {
//   console.log('WWWWWWWWWW ', response)
//   const title = response.payload.fields.quick_replies.structValue.fields.title.stringValue
//   const items = []
//   const result: IQuickReplyObj = {
//     items: [],
//     title: ''
//   }
//   const values = findVal(response, 'values')
//   for (const obj of values) {
//     items.push(findVal(obj, 'stringValue'))
//   }

//   result.items = items
//   result.title = title

//   return result
// }

// // function sendResponse (response: any): IQuickReplyObj {
// async function sendResponse (body: any): Promise<any> {
//   await axios.post('https://graph.facebook.com/v17.0/me/messages?access_token=EAADREtpfWRABOwFMVDsregGfAQOUjFUz6sYGDyziXlQJ3NGqNhwaXfpdwvlFt83Ayn2DhdrmUdCn6bLF8M21SRCnO3Bd0vw7q4dQK68IdVqQVE6OTStLRL9tZAA9hVSB16slxC2OlUJk9pPJq5RzSTS5rT8sQ6INLvZB2ExSxnjOxVMVagJQOuqZCtY9O27EBkPZCIrvizbVnrIZD', body)

//   return null
// }

export class DialogflowModel {
  senderId: string
  data: any
  //   apiNumber: number

  constructor (_data: any, _senderId: string) {
    this.senderId = _senderId
    this.data = _data
  }

  //   constructor (_data: any, _sessionId: string, isDialogflow: boolean) {
  //     this.data = _data
  //     this.sessionId = _sessionId
  //     const strArr = _data.session.split('/')
  //     const streamId = strArr[strArr.length - 1]
  //     const streamIdDecoded = Buffer.from(streamId, 'base64').toString()
  //     if (isDialogflow) {
  //       this.apiNumber = 5
  //     } else {
  //       logger.info('%o', 'BAHURKA> ' + String(_sessionId))
  //       this.apiNumber = Number(streamIdDecoded.split(':')[1])
  //     }
  //   }

  retrieveOrderData = async (orderNo: any, senderId: any): Promise<any> => {
    // console.log('============== ', senderId)
    const res = await axios.get('https://www-bestoffers-com.myshopify.com/admin/api/2023-07/orders.json', {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': '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'
      }
    })

    const found = res.data.orders.find((element: any) => element.name === '#' + String(orderNo))
    // console.log('KKKKKKK ', found)

    let itemsList: string = ''
    for (const item of found.line_items) {
      itemsList += String(item.name) + ' ' + '(' + String(item.price) + ')\n'
    }
    // if(order not found ){...}
    const eventData = {
      name: 'confirmOrder',
      parameters: {
        // price: found.total_price,
        // items: itemsList
      },
      languageCode: 'bg-BG'
    }

    const contexts = {
      contexts: [{
        name: 'projects/newagent-chlq/agent/sessions/6410817318963856/contexts/orderfound',
        lifespanCount: 18
      }]
    }

    return fulfillmentObj(eventData, [])

    // // ==============================================================================

    // // to edit
    // const [obj] = result.fulfillmentMessages
    // console.log('EEEEEEEEEE ', obj)
    // const quickReplyObj = constructValues(obj)
    // const quckReplies = []

    // for (const name of quickReplyObj.items) {
    //   quckReplies.push({
    //     content_type: 'text',
    //     title: name,
    //     payload: '<POSTBACK_PAYLOAD_1>'
    //   })
    // }

    // const body = {
    //   recipient: {
    //     id: this.senderId
    //   },
    //   messaging_type: 'RESPONSE',
    //   message: {
    //     text: quickReplyObj.title,
    //     quick_replies: quckReplies
    //   },
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }

    // await sendResponse(body)
  }
}
