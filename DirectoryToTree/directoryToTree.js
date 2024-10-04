const fs = require('fs');
const path = require('path');

function directoryToTree(rootDir, depth) {
    function buildTree(currentPath, currentDepth) {
        const info = fs.statSync(currentPath);
        const node = {
            name: path.basename(currentPath),
            path: path.relative(process.cwd(), currentPath),
            type: info.isDirectory() ? 'dir' : 'file',
            size: info.size
        };

        if (info.isDirectory() && currentDepth > 0) {
            node.children = fs.readdirSync(currentPath).map(child =>
                buildTree(path.join(currentPath, child), currentDepth - 1)
            );
        }

        return node;
    }

    return buildTree(path.resolve(process.cwd(), rootDir), depth);
}

// const tree = directoryToTree('dummy_dir', 1);
// console.log(JSON.stringify(tree, null, 2));

module.exports = directoryToTree;