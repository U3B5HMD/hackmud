/**
 * Cracks tier 1 corporations for locs.
 * @param {Object} context Context.
 * @param {Object} args Arguments passed to script.
 *
 * @returns {(String[])} Collection of locs.
 */
export default function LocHarvester (context, args) {
    let callResult,
        callScript = (params, split = true) => {
            callResult = args.t.call(params);

            return split ? callResult.split("\n").pop() : callResult;
        },
        commandsRegExp = /([a-zA-Z_]+)/gmi,
        isAuthenticatedRegExp = /Aut/,
        specialCommandRegExp = /(\w+):"([^\s]+)"/,
        passwordRegExp = /egy\s([a-zA-Z_]+)/,
        projectRegExp = /([\w\.]+(?:_|\.)[\w+]+)/gmi,
        /** @type {any} */
        passKey = 1,
        projects = [],
        locs = [],
        project,
        specialCommand,
        key,
        password,
        developments,
        about,
        passwordVariations = [ "p", "pass", "password" ],
        finalCommand,
        response = callScript();

    [ , key, specialCommand ] = specialCommandRegExp.exec(callScript({})) || [];
    [ [ developments ], [ about ] ] = [ ...response.matchAll(commandsRegExp) ];
    [ , password ] = passwordRegExp.exec(callScript({ [key]: about })) || [];

    while (!isAuthenticatedRegExp.exec(response) && passKey) {
        passKey = passwordVariations.pop();
        finalCommand = {
            [key]: specialCommand,
            [passKey]: password
        };

        response = callScript(finalCommand);
    }

    response = callScript({ [key]: developments }, false).join("\n");
    projects = response.matchAll(projectRegExp);

    for ([ project ] of projects) {
        response = callScript(Object.assign({}, finalCommand, { project }), false);

        if (response.shift) {
            locs = locs.concat(response);
        }
    }

    return locs;
}
