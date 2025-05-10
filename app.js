import express from 'express';
import cors from 'cors';
import path from 'path'
import { __dirname } from './src/utils/paths.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded( {extended: true}));
app.use(express.static(path.join(__dirname, 'web')));

app.listen(3333, () => {
    console.log('Servidor rodando na porta 3333');
});


export const config = () => {
    return app;
}