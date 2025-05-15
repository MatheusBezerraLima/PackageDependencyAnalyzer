import path from 'path';
import { __dirname } from '../utils/paths.js';
import fs from 'fs';
import { application } from 'express';

export const analyserJsonService = async(file, res) => {
    const pathData = path.join(__dirname, `/public/data/uploads/${file}`)
    try{
        const data = fs.readFileSync(pathData, 'utf-8');        
        const dataJson = JSON.parse(data)
        console.log(dataJson.dependencies);
        
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify(dataJson))
        
    }catch(err){
        console.log(err);
        return;
    }
}