/*
 * Removes the function name from scripts
 * 'function foo()' becomes 'function ()'
 */
function plugin () {
    return {
        visitor: {
            FunctionDeclaration (path) {
                if (path.node.id) {
                    path.node.id.name = "";
                }
            }
        }
    };
}

module.exports = plugin;