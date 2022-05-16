/*
 * Removes `export default` from scripts.
 * 'export default function foo()' becomes 'function foo()'.
 */
function plugin ({ types }) {
    return {
        visitor: {
            ImportDeclaration (path) {
                path.remove();
            },
            ExportDefaultDeclaration (path) {
                const declaration = path.node.declaration;
                if (types.isFunctionDeclaration(declaration)) {
                    path.replaceWith(declaration);
                } else {
                    path.remove();
                }
            }
        }
    };
}

module.exports = plugin;