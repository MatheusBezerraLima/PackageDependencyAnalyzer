const axios = require('axios');

const getPackageVersionDetails = async(packageName, packageVersion) => {
    try{
        const response = await axios.get(`https://registry.npmjs.org/${packageName}/${packageVersion}`);
        return response.data;
    }catch(error){
        console.error(`Erro ao buscar ${packageName}@${packageVersion}:`, error.message);
        return null;
    }
}

module.exports = getPackageVersionDetails;
