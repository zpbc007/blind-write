import {Request, Response, NextFunction} from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
    console.log(`url请求地址：${req.originalUrl}, method: ${req.method}`)
    next()
}