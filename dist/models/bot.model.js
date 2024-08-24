var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
function sendResponse(body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios.post('https://graph.facebook.com/v17.0/me/messages?access_token=EAADREtpfWRABOwFMVDsregGfAQOUjFUz6sYGDyziXlQJ3NGqNhwaXfpdwvlFt83Ayn2DhdrmUdCn6bLF8M21SRCnO3Bd0vw7q4dQK68IdVqQVE6OTStLRL9tZAA9hVSB16slxC2OlUJk9pPJq5RzSTS5rT8sQ6INLvZB2ExSxnjOxVMVagJQOuqZCtY9O27EBkPZCIrvizbVnrIZD', body);
    });
}
export class BotModel {
    constructor(_senderId) {
        this.sendMessage = (text) => __awaiter(this, void 0, void 0, function* () {
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
            };
            const res = yield sendResponse(body);
            // console.log(' RES>>>> ', res);
            return null;
        });
        console.log(' GGGGGG ', _senderId);
        this.senderId = _senderId;
    }
}
