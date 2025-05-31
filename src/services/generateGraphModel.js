
export const generateGraphModelService = async (dependencies, projectName) => {
    
    const nodes = [
        { data: { id: projectName, label: projectName} }
    ];
    const edges = [];

    const visited = new Set();

    const buildGraph = (currentPkg, deps) => {
        for( const [pkg, version] of Object.entries(dependencies)){

            if(visited.has(pkg)) continue;
            visited.add(pkg);
            console.log(pkg);
            
            nodes.push( {data: { id: pkg, label: `${pkg}@${version}`} } );
            edges.push( {data: {source: projectName, target: pkg} });
        }

    }

    buildGraph(projectName, dependencies);
    
    console.log("nodes:", nodes);
    console.log("edges:", edges);
    
}