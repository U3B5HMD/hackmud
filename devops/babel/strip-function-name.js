/**
 * Returns a plugin that trips the names from all function declarations in a
 * script.
 *
 * @returns {Object} The plugin.
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
