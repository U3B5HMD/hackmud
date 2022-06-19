/**
 * Returns a plugin that removes import and export declarations from a script.
 * @returns {Object} The plugin.
 */
export default function plugin ({ types }) {
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
