import path from 'path';
import { __dirname } from '../utils/paths.js';
import fs from 'fs';
import { application } from 'express';

export const analyserJsonService = async(file, res) => {
    const pathData = path.join(__dirname, `/public/data/uploads/${file}`);

    try{
        const data = fs.readFileSync(pathData, 'utf-8');   
        
        if(!data){
            console.log("Vazio");
            return { dependencies: ""}
        }
        
        const dataJson = JSON.parse(data);
        const dependencies = dataJson.dependencies
        
        if(!dependencies){
            return {dependencies: ""};
        }

        return {dependencies: dependencies};

    }catch(err){
        throw new Error(err.code);
    }
}