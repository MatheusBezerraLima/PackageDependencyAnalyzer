
export const generateGraphModelService = async (dependencies, projectName) => {
    
    const nodes = [
        { data: { id: projectName, label: projectName} }
    ];
    const edges = [];

    for( const [pkg, version] of Object.entries(dependencies)){
        nodes.push( {data: { id: pkg, label: `${pkg}@${version}`} } );
        edges.push( {data: {source: projectName, target: pkg} });
    }

    console.log("nodes:", nodes);
    console.log("edges:", edges);
    
}