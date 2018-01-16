import * as express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('d3')
})

router.get('/test', (req, res) => {
    res.send('d3 test')
})

export default router