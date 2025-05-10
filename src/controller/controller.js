export const verifyTypeFile = async (req, res, next) => {
  const dataFile = req.file;

  if (!dataFile) {
    res.status(401).json({ erro: "Nenhum arquivo adicionado" });
  }

  try {
    const typeFile = dataFile.mimetype;

    if (typeFile != "application/json") {
      console.log("Type de arquivo errado, mande um arquivo .json");
      return;
    }

    console.log(dataFile);
    next();
  } catch (err) {
    res.status(400).json({ erro: "Erro ao ler o arquivo"})
  }
};

export const getGraphBuilder = async (req, res) => {
  const file = req.file;

};
