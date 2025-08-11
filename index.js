const { app_config } = require('./app.js')();
const multer = require('multer');
const path = require('path');
const {getGraphBuilder, verifyTypeFile} = require('./src/controller/controller.js')
const upload = multer({ dest: "./public/data/uploads/"});

const app = app_config;

app.get('/', (req, res) => {
    res.render('index.ejs');
});


app.post('/upload', upload.single('avatar'), verifyTypeFile, async(req, res, next) => {
    await getGraphBuilder(req, res);
});
