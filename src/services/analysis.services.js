const path = require("path");
const fs = require("fs");
const getPackageVersionDetails  = require("./npm.service"); 
const { version } = require("os");
const { de } = require("@faker-js/faker");

/**
 * Funçãp auxiliar, recursiva, que constrói a árvore de dependencias
 * @param {string} packageName - O nome do pacote que será resolvido 
 * @param {string} packageVersion - A versão 
 * @param {string | null} parentNodeId - O id do nó que depende desse pacote. 
 * @param {object} context - O objeto que carrega o estado de análise. 
 * @param {Array} context.nodes - A lista de nós que estão sendo construidos.   
 * @param {Array} context.nodes - A lista de arestas que estão sendo construidos. 
 * @param {Set} context.processedPackages - Para evitar loops infinitos.  
 */
const resolveDependencies = async(packageName, packageVersion, parentNodeId, context) => {
    // Limpando a versão:
    const exactVersion = packageVersion.replace(/[\^~]/g, '');
    const nodeId = `${packageName}@${packageVersion}`;

    // !! Verificar se o pacote já foi processado:
    // Se sim, é criado apenas a aresta e para o loop
    if(context.processedPackages.has(nodeId)) {
        if(parentNodeId) {
            context.edges.push({
                id: `e-${parentNodeId}-${nodeId}`,
                source: parentNodeId,
                target: nodeId 
            });
        }
        return;
    }

    // Marcando como processado
    context.processedPackages.add(nodeId);
    // Chamando a API para receber os detalhes do pacote.
    const details = await getPackageVersionDetails(packageName, exactVersion);

    if(!details){
        return;
    }

    // Armazenar o nó na coleção central
    context.nodes.push({
        id: nodeId,
        type: 'custom',
        data: { label: details.name, version: details.version },
        position: { x: 0, y: 0} //layout será calculado no frontend  
    });

    // Armazenar a a eresta (a conexão com o pai)
    context.edges.push({
        id: `e-${parentNodeId}-${nodeId}`,
        source: parentNodeId,
        target: nodeId
    });

    // RECURSIVIDADE:
    // Se o pacote atual tiver as suas próprias dependencias chamamos a função para cada uma delas
    if(details.dependencies) {
        const dependencyPromisses = Object.entries(details.dependencies).map(([name, version]) => {
            // O `nodeId` atual como o `parentNodeId` da próxima chamada
            return resolveDependencies(name, version, nodeId, context);
        });
    
        await Promise.all(dependencyPromisses);
    }
}

/**
 * Função principal que orquestra a análise. A que o controller chama. 
 * @param {string} packageJsonContent - O conteúdo do package.json enviado pelo usuário
 * @returns {Promise<nodes: Array, edges: Array>} - O resultado final para o frontend
 */

// Função que analiza o arquivo json retornando as suas dependencias em uma variável
const startAnalysis = async(packageJsonContent) => {
    const rootDir = path.resolve(__dirname, "../.."); // sobe 1 pasta
    const pathData = path.join(rootDir, `/public/data/uploads/${packageJsonContent.filename}`);
    const data = fs.readFileSync(pathData, "utf-8");

    if (!data) {
      console.log("Arquivo vazio!!");
      return { dependencies: "" };
    }

    const packageData = JSON.parse(data);
    const initialDependencies = {
        ...packageData.dependencies,
        ...packageData.devDependencies,
    }

    // 1. Inicialização da coleção central de dados
    const context = {
        nodes: [],
        edges: [],
        processedPackages: new Set(),
    };

    // Nó raiz
    const rootNodeId = 'project-root';
    context.nodes.push({
        id: rootNodeId,
        type: 'custom',
        data: { label: packageData.name || 'Meu Projeto', version: packageData.version || ''},
        position: {x: 0, y: 0}
    });

    // Chamadas iniciais
    // Array de promessas (Jà que a função resolveDependencies() é asyncrona);
    const initialPromisses = Object.entries(initialDependencies).map(([name, version]) => {
        return resolveDependencies(name, version, rootNodeId, context);
    });

    // Aguardar todas as promessas
    await Promise.all(initialPromisses);

    // Logica de desatualizados, duplicados tudo aqui... 

    return {
        nodes: context.nodes,
        edges: context.edges,
    }
};

module.exports = startAnalysis;
