const path =  require('path');
const fs = require('fs');

const analyserJsonService = async(file, res) => {
    const pathData = path.join(__dirname, `/public/data/uploads/${file}`);

    try{
        const data = fs.readFileSync(pathData, 'utf-8');   
        
        if(!data){
            console.log("Vazio");
            return { dependencies: ""}
        }
        
        const dataJson = JSON.parse(data);
        const dependencies = dataJson.dependencies
        const projectName = dataJson.name

        if(!dependencies){
            return {dependencies: "", projectName: ""};
        }

        return {dependencies: dependencies, projectName: projectName};

    }catch(err){
        throw new Error(err.code);
    }
}

module.exports = analyserJsonService;