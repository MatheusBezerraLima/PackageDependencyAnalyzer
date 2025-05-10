import { config } from './app.js';
import multer from 'multer';
import { __dirname } from './src/utils/paths.js';
import path from 'path';
import { getGraphBuilder, verifyTypeFile } from './src/controller/controller.js';

const upload = multer({ dest: "./public/data/uploads/"});

const app = config();


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/web/index.html'));
});


app.post('/upload', upload.single('avatar'), verifyTypeFile, async(req, res, next) => {
    await getGraphBuilder(req, res);
});
