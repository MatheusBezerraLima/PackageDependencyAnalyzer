const analyserJsonService = require('../services/analyzer.js');
const { generateGraphModelService } = require('../services/generateGraphModel.js');

// Middleware para verificar o tipo de arquivo recebido
const verifyTypeFile = async (req, res, next) => {
  const dataFile = req.file;
  
  if (!dataFile) {
    res.status(401).json({ erro: "Nenhum arquivo adicionado" });
  }

  try {
    const nameFile = dataFile.originalname;

    if (nameFile != "package.json") {
      console.log("O unico arquivo aceito é o 'package.json' !!");
      return;
    }
    next();
  } catch (err) {
    res.status(400).json({ erro: "Erro ao ler o arquivo"})
  }
};

const getGraphBuilder = async (req, res) => {
  const file = req.file;

  try{
    const { dependencies, projectName }  = await analyserJsonService(file.filename, res)

    if(dependencies === ""){
      console.log('Sem dependencias no projeto!');
    }
    console.log("Qui");
    
    await generateGraphModelService(dependencies, projectName);
  }catch(err){
    console.log(err);
  }
};


module.exports = {verifyTypeFile, getGraphBuilder};