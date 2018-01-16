import * as express from 'express'
// 项目配置文件
import config from './config'
import routes from '../routes/index'
import middleware from '../middleware/index'

const app = express()

// 中间件
app.use(middleware.logger)

// 路由
app.use('/d3', routes.d3)
app.use('/algorithm', routes.algorithm)

console.log('> Starting server ...')
app.listen(config.port, () => {
    console.log(`Listening at http://localhost:${config.port}`)
})