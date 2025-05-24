import { analyserJsonService } from '../services/analyzer.js';
import { generateGraphModelService } from '../services/generateGraphModel.js';

export const verifyTypeFile = async (req, res, next) => {
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

export const getGraphBuilder = async (req, res) => {
  const file = req.file;

  const { dependencies, projectName }  = await analyserJsonService(file.filename, res)

  if(dependencies === ""){
    console.log('Sem dependencias no projeto!');
  }

  await generateGraphModelService(dependencies, projectName);
  
};
