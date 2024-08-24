import axios from 'axios'

// import { detectIntent } from '../controllers/chatbot.js'

import IQuickReplyObj from '../interfaces/IQuickReplyObj'

async function sendResponse (body: any): Promise<any> {
  return await axios.post('https://graph.facebook.com/v17.0/me/messages?access_token=EAADREtpfWRABOwFMVDsregGfAQOUjFUz6sYGDyziXlQJ3NGqNhwaXfpdwvlFt83Ayn2DhdrmUdCn6bLF8M21SRCnO3Bd0vw7q4dQK68IdVqQVE6OTStLRL9tZAA9hVSB16slxC2OlUJk9pPJq5RzSTS5rT8sQ6INLvZB2ExSxnjOxVMVagJQOuqZCtY9O27EBkPZCIrvizbVnrIZD', body)
}

export class BotModel {
  senderId: string

  constructor (_senderId: string) {
    console.log(' GGGGGG ', _senderId)
    this.senderId = _senderId
  }

  sendMessage = async (text: string): Promise<any> => {
    // const [obj] = result
    // const quickReplyObj = constructValues(obj)
    // const quckReplies = []

    // for (const name of quickReplyObj.items) {
    //   quckReplies.push({
    //     content_type: 'text',
    //     title: name,
    //     payload: '<POSTBACK_PAYLOAD_1>'
    //   })
    // }

    const body = {
      recipient: {
        id: this.senderId
      },
      messaging_type: 'RESPONSE',
      message: {
        text: text,
        // quick_replies: quckReplies
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await sendResponse(body)
    // console.log(' RES>>>> ', res);
    return null
  }
}
