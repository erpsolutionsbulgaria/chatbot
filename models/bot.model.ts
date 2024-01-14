import axios from 'axios'
import { findVal } from '../helpers/helperFunctions.js'

import { detectIntent } from '../controllers/chatbot.js'

import IQuickReplyObj from '../interfaces/IQuickReplyObj'

function constructValues (response: any): IQuickReplyObj {
  const title = response.payload.fields.quick_replies.structValue.fields.title.stringValue
  const items = []
  const result: IQuickReplyObj = {
    items: [],
    title: ''
  }
  const values = findVal(response, 'values')
  for (const obj of values) {
    items.push(findVal(obj, 'stringValue'))
  }

  result.items = items
  result.title = title

  return result
}

// function sendResponse (response: any): IQuickReplyObj {
async function sendResponse (body: any): Promise<any> {
  await axios.post('https://graph.facebook.com/v17.0/me/messages?access_token=EAADREtpfWRABOwFMVDsregGfAQOUjFUz6sYGDyziXlQJ3NGqNhwaXfpdwvlFt83Ayn2DhdrmUdCn6bLF8M21SRCnO3Bd0vw7q4dQK68IdVqQVE6OTStLRL9tZAA9hVSB16slxC2OlUJk9pPJq5RzSTS5rT8sQ6INLvZB2ExSxnjOxVMVagJQOuqZCtY9O27EBkPZCIrvizbVnrIZD', body)

  return null
}

export class BotModel {
  senderId: string

  constructor (_senderId: string) {
    this.senderId = _senderId
  }

  getBestSellingProduct = async (): Promise<any> => {
    const res = await axios.get('https://www-bestoffers-com.myshopify.com/admin/api/2023-07/products.json', {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': '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'
      }
    })
    const mainImage = res.data.products[0].image.src
    const title = res.data.products[0].title
    const data = {
      mainImage,
      title
    }

    return data
  }

  sendOffers = async (): Promise<any> => {
    const data = await this.getBestSellingProduct()

    await axios.post('https://graph.facebook.com/v17.0/me/messages?access_token=EAADREtpfWRABOwFMVDsregGfAQOUjFUz6sYGDyziXlQJ3NGqNhwaXfpdwvlFt83Ayn2DhdrmUdCn6bLF8M21SRCnO3Bd0vw7q4dQK68IdVqQVE6OTStLRL9tZAA9hVSB16slxC2OlUJk9pPJq5RzSTS5rT8sQ6INLvZB2ExSxnjOxVMVagJQOuqZCtY9O27EBkPZCIrvizbVnrIZD', {
      recipient: {
        id: this.senderId
      },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [
              {
                title: data.title,
                image_url: data.mainImage,
                subtitle: 'We have the right hat for everyone.',
                default_action: {
                  type: 'web_url',
                  url: 'https://www.originalcoastclothing.com'
                },
                buttons: [
                  {
                    type: 'web_url',
                    url: 'https://www.originalcoastclothing.com',
                    title: 'View Website'
                  }, {
                    type: 'postback',
                    title: 'Start Chatting',
                    payload: 'DEVELOPER_DEFINED_PAYLOAD'
                  }
                ]
              }
            ]
          }
        }
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return null
  }

  sendWelcomeIntent = async (result: any): Promise<any> => {
    const [obj] = result
    const quickReplyObj = constructValues(obj)
    const quckReplies = []

    for (const name of quickReplyObj.items) {
      quckReplies.push({
        content_type: 'text',
        title: name,
        payload: '<POSTBACK_PAYLOAD_1>'
      })
    }

    const body = {
      recipient: {
        id: this.senderId
      },
      messaging_type: 'RESPONSE',
      message: {
        text: quickReplyObj.title,
        quick_replies: quckReplies
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }

    await sendResponse(body)

    return null
  }

  // sendResponse = async (body: any): Promise<any> => {
  //   await axios.post('https://graph.facebook.com/v17.0/me/messages?access_token=EAADREtpfWRABOwFMVDsregGfAQOUjFUz6sYGDyziXlQJ3NGqNhwaXfpdwvlFt83Ayn2DhdrmUdCn6bLF8M21SRCnO3Bd0vw7q4dQK68IdVqQVE6OTStLRL9tZAA9hVSB16slxC2OlUJk9pPJq5RzSTS5rT8sQ6INLvZB2ExSxnjOxVMVagJQOuqZCtY9O27EBkPZCIrvizbVnrIZD', body)

  //   return null
  // }

  // retrieveOrderData = async (orderNo: any, senderId: any): Promise<any> => {
  //   // console.log('============== ', senderId)
  //   const res = await axios.get('https://www-bestoffers-com.myshopify.com/admin/api/2023-07/orders.json', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-Shopify-Access-Token': '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'
  //     }
  //   })

  //   const found = res.data.orders.find((element: any) => element.name === '#' + String(orderNo))
  //   // console.log('KKKKKKK ', found)

  //   let itemsList: string = ''
  //   for (const item of found.line_items) {
  //     itemsList += String(item.name) + ' ' + '(' + String(item.price) + ')\n'
  //   }
  //   // if(order not found ){...}
  //   const queryInput = {
  //     event: {
  //       name: 'confirmOrder',
  //       parameters: {
  //         price: found.total_price,
  //         items: itemsList
  //       },
  //       languageCode: 'bg-BG'
  //     }
  //   }

  //   const queryParams = {
  //     contexts: [{
  //       name: 'projects/newagent-chlq/agent/sessions/6410817318963856/contexts/orderfound',
  //       lifespanCount: 18
  //     }]
  //   }

  //   const result = await detectIntent(queryInput, senderId, queryParams)
  //   console.log('BAHURKA   ', result)

  //   // ==============================================================================

  //   // to edit
  //   const [obj] = result.fulfillmentMessages
  //   console.log('EEEEEEEEEE ', obj)
  //   const quickReplyObj = constructValues(obj)
  //   const quckReplies = []

  //   for (const name of quickReplyObj.items) {
  //     quckReplies.push({
  //       content_type: 'text',
  //       title: name,
  //       payload: '<POSTBACK_PAYLOAD_1>'
  //     })
  //   }

  //   const body = {
  //     recipient: {
  //       id: this.senderId
  //     },
  //     messaging_type: 'RESPONSE',
  //     message: {
  //       text: quickReplyObj.title,
  //       quick_replies: quckReplies
  //     },
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }

  //   await sendResponse(body)

  //   // ===============================================================================

  //   // detectIntent()
  //   // console.log('MMMMMMMM ', found)

  //   // for (const obj of res.data.orders) {
  //   //   if (obj.name === '#' + String(orderNo)) {

  //   //   }
  //   // }
  //   // const mainImage = res.data.products[0].image.src
  //   // const title = res.data.products[0].title
  //   // const data = {
  //   //   mainImage,
  //   //   title
  //   // }
  //   // console.log('>>>>>>>>>>>> ', res.data.products[0].image)
  //   // return data
  // }
}
