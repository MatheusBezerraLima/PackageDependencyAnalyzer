const analyserJsonService = require('../services/analysis.services.js');
const { generateGraphModelService } = require('../services/generateGraphModel.js');
const services = require('../services/analysis.services.js');
// Middleware para verificar o tipo de arquivo recebido

class Controller{

  verifyTypeFile(req, res, next){
    const dataFile = req.file;

    if(!dataFile){
      res.status(401).json({erro: "Nenhum arquivo adicionado"})
    }

    try{
      const nameFile = dataFile.originalname;
      if(nameFile != "package.json"){
        console.log("Adicione um arquivo package.json");
        return;
      }

      next()
    }catch(err){
      res.status(400).json({ erro: "Erro ao ler arquivo"});
    }
  } 

  async analyzeJson(req, res){
    const file = req.file;

    try{
      const { dependencies, projectName } = await services.analyserJsonService(file);

      if(dependencies === ""){
        console.log("Sem dependencias no projeto!");
      }
      // await generateGraphModelService(dependencies, projectName);
    }catch(err){
      console.log(err);
    }
  }
}



module.exports = new Controller;