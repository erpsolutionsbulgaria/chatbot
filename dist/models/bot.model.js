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
import { findVal } from '../helpers/helperFunctions.js';
function constructValues(response) {
    const title = response.payload.fields.quick_replies.structValue.fields.title.stringValue;
    const items = [];
    const result = {
        items: [],
        title: ''
    };
    const values = findVal(response, 'values');
    for (const obj of values) {
        items.push(findVal(obj, 'stringValue'));
    }
    result.items = items;
    result.title = title;
    return result;
}
// function sendResponse (response: any): IQuickReplyObj {
function sendResponse(body) {
    return __awaiter(this, void 0, void 0, function* () {
        yield axios.post('https://graph.facebook.com/v17.0/me/messages?access_token=EAADREtpfWRABOwFMVDsregGfAQOUjFUz6sYGDyziXlQJ3NGqNhwaXfpdwvlFt83Ayn2DhdrmUdCn6bLF8M21SRCnO3Bd0vw7q4dQK68IdVqQVE6OTStLRL9tZAA9hVSB16slxC2OlUJk9pPJq5RzSTS5rT8sQ6INLvZB2ExSxnjOxVMVagJQOuqZCtY9O27EBkPZCIrvizbVnrIZD', body);
        return null;
    });
}
export class BotModel {
    constructor(_senderId) {
        this.getBestSellingProduct = () => __awaiter(this, void 0, void 0, function* () {
            const res = yield axios.get('https://www-bestoffers-com.myshopify.com/admin/api/2023-07/products.json', {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': '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'
                }
            });
            const mainImage = res.data.products[0].image.src;
            const title = res.data.products[0].title;
            const data = {
                mainImage,
                title
            };
            return data;
        });
        this.sendOffers = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getBestSellingProduct();
            yield axios.post('https://graph.facebook.com/v17.0/me/messages?access_token=EAADREtpfWRABOwFMVDsregGfAQOUjFUz6sYGDyziXlQJ3NGqNhwaXfpdwvlFt83Ayn2DhdrmUdCn6bLF8M21SRCnO3Bd0vw7q4dQK68IdVqQVE6OTStLRL9tZAA9hVSB16slxC2OlUJk9pPJq5RzSTS5rT8sQ6INLvZB2ExSxnjOxVMVagJQOuqZCtY9O27EBkPZCIrvizbVnrIZD', {
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
            });
            return null;
        });
        this.sendWelcomeIntent = (result) => __awaiter(this, void 0, void 0, function* () {
            const [obj] = result;
            const quickReplyObj = constructValues(obj);
            const quckReplies = [];
            for (const name of quickReplyObj.items) {
                quckReplies.push({
                    content_type: 'text',
                    title: name,
                    payload: '<POSTBACK_PAYLOAD_1>'
                });
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
            };
            yield sendResponse(body);
            return null;
        });
        this.senderId = _senderId;
    }
}
