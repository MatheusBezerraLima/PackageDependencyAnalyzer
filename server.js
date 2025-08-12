const app = require('./app.js')();
const multer = require('multer');
const controller = require('./src/controller/analyze.controller.js');
const upload = multer({ dest: "./public/data/uploads/"});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/analyze', upload.single('avatar'), controller.verifyTypeFile, async(req, res, next) => {
    await controller.analyzeJson(req, res);
});
