const startAnalysis = require("../services/analysis.services.js");


// Middleware para verificar o tipo de arquivo recebido
const verifyTypeFile = async (req, res, next) => {
  const dataFile = req.file;

  if (!dataFile) {
    res.status(401).json({ erro: "Nenhum arquivo adicionado" });
  }

  try {
    const nameFile = dataFile.originalname;
    if (nameFile != "package.json") {
      console.log("Adicione um arquivo package.json");
      return;
    }

    next();
  } catch (err) {
    res.status(400).json({ erro: "Erro ao ler arquivo" });
  }
};

const analyzeJson = async (req, res) => {
  try {
    const file = req.file;
    const { nodes, edges } = await startAnalysis(file);

    if (nodes === "") {
      console.log("Sem dependencias no projeto!");
    }
    console.log({ Nodes: nodes, Edges: edges });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  analyzeJson,
  verifyTypeFile
};
