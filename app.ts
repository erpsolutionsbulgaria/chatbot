import express, { Request, Response, NextFunction } from 'express'
// import { Unauthorized } from './src/helpers/error-handling.js'
// import { devKeys } from './src/utils/devKeys.js'

import processQuery from './controllers/dialogflow.js'
import textQuery from './controllers/chatbot.js'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
// import intentConsts from './constants'
// import { fulfillmentObj } from './src/controllers/response.js'
// import { sendError } from './src/helpers/errorHandler.js'
// import logger from './src/utils/common.logger.js'

// import * as dotenv from 'dotenv'
// dotenv.config()

const app = express()

app.use(cors())
app.set('view-engine', 'ejs')
// app.use(express.urlencoded({ extended: false }))
app.use(express.static('uploads/users'))
app.use(morgan('dev'))
// app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use((req: Request, res: Response, next: NextFunction) => {
  res.set('Content-Type', 'text/json')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200)
  }
  next()
})

// const IsAuthenticated = (req: Request, res: Response, next: NextFunction): any => {
//   const {
//     BOOHOO_BOT_USERNAME,
//     BOOHOO_BOT_PASSWORD,
//     BOOHOO_BOT_SECURITY_KEY
//   } = devKeys
//   const authData = req.headers.authorization
//   const securityKey = req.headers.securitykey
//   const error = new Unauthorized()
//   error.status = 401

//   if (authData != null) {
//     const buff = Buffer.from(authData.substring(6), 'base64')
//     const text = buff.toString('ascii')
//     const credentials = text.split(':')
//     if (credentials[0] === BOOHOO_BOT_USERNAME &&
//         credentials[1] === BOOHOO_BOT_PASSWORD &&
//         securityKey === BOOHOO_BOT_SECURITY_KEY) {
//       next()
//     } else {
//       logger.error('%o', error)
//       next(error)
//     }
//   } else {
//     logger.error('%o', error)
//     next(error)
//   }
// }

app.get('/status', (req: Request, res: Response) => {
  void (() => {
    res.status(200).send({ status: 'ok' })
  })()
})

app.get('/webhook', (req: Request, res: Response) => {
  void (async () => {
    // try {
    const challenge = req.query['hub.challenge']

    console.log('WEBHOOK_VERIFIED')
    res.send(challenge)
    // } catch (err) {
    //   throw err
    // }
  })()
})

app.post('/webhook', (req: Request, res: Response) => {
  void (async () => {
    await textQuery(req.body)
    res.status(200).send('fsfdsfds')
  })()
})

app.post('/dialogflow', (req: Request, res: Response) => {
  void (async () => {
    const result = await processQuery(req.body)
    res.status(200).send(result)
  })()
})

// DELETE https://{endpoint}/v2/{name=projects/*/agent/sessions/*/contexts/*}

// app.get('/bahurka', (req: Request, res: Response) => {
//   void (async () => {
//     const headers = req.headers
//     const publicIP = headers['x-forwarded-for']
//     console.log('>>>>>>> ', publicIP, '====', req.socket.remoteAddress, '<<<<<<', req.ip)
//     res.status(200).send('fsfdsfds')
//   })()
// })

app.get('/validate', (req: Request, res: Response) => {
  void (async () => {
    res.status(200).send({ result: 'GOLQM KUR' })
  })()
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const responseCode: number = (error.status !== undefined) ? error.status : 500
  res.status(responseCode)
  res.json({
    error: {
      message: error.message
    }
  })
})

export { app }
