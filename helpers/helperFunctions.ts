
import { eventsContextMap } from '../constants.js'

import IContextObj from '../interfaces/IContextObj'
import IMessageObj from '../interfaces/IMessageObj'

export const formatHistory = (historyData: IMessageObj[]): any => {
  const result = []
  const sortedHistory: IMessageObj[] = historyData.sort((a, b) => new Date(a.actionTs).getTime() - new Date(b.actionTs).getTime());

  for (const elem of sortedHistory) {
    result.push({
      role: elem.role,
      content: elem.message
    })
  }

  console.log(' ===== ', result)
  return result
}