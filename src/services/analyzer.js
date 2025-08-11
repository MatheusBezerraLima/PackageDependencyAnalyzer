const path =  require('path');
const fs = require('fs');
const { root_dirname } = require('../../app.js');

const analyserJsonService = async(file, res) => {    
    const pathData = path.join(root_dirname, `/public/data/uploads/${file}`);
    
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
        console.log({"dependencies": dependencies, "projectName": projectName});
        
        return {dependencies: dependencies, projectName: projectName};

    }catch(err){
        throw new Error(err);
    }
}

module.exports = analyserJsonService;