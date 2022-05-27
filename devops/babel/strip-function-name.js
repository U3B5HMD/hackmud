/*
 * Removes the function name from scripts
 * 'function foo()' becomes 'function ()'
 */
export default function plugin () {
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
