const path =  require('path');
const fs = require('fs');

class Services{
    // Função que analiza o arquivo json retornando as suas dependencias em uma variável 
    async analyserJsonService(file){

    const rootDir = path.resolve(__dirname, '../..'); // sobe 1 pasta     
    const pathData = path.join(rootDir, `/public/data/uploads/${file.filename}`);
    
    try{
        const data = fs.readFileSync(pathData, 'utf-8');   
        
        if(!data){
            console.log("Arquivo vazio!!");
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
        throw new Error(err);
    }
}
}

module.exports = new Services;