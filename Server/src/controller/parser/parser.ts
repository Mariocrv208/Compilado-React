import { Response, Request } from "express";
const fs = require('fs')

const { template } = require('../../../public/index.html')

export const parse = (req: Request & unknown, res: Response): void => {
    fs.readFile('./public/index.html', function(err: any, html:any){
        if(err){
            throw err
        }

        res.write(html)
        res.end()
    })
}