const app = require('./app.js')();
const multer = require('multer');
const {analyzeJson, verifyTypeFile} = require('./src/controller/analyze.controller.js');
const upload = multer({ dest: "./public/data/uploads/"});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/analyze', upload.single('avatar'), verifyTypeFile, async(req, res, next) => {
    await analyzeJson(req, res);
});
