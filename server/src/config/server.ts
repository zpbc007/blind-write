import * as express from 'express'
// // 项目配置文件
import config from './config'
import routes from '@routes/index'

import middleware from '../middleware/index'
import * as mongoClient from 'mongodb'

const app = express()

// 中间件
app.use(middleware.logger)

// 路由
app.use('/d3', routes.d3)
app.use('/algorithm', routes.algorithm)

// 数据库
mongoClient.connect(config.dbUrl, (err, db) => {
    if (err) {
        throw new Error(`db connect error: ${err}`)
    }
    console.log('db connected')

    console.log(db.stats)
})

console.log('> Starting server ...')
app.listen(config.port, () => {
    console.log(`Listening at http://localhost:${config.port}`)
})
