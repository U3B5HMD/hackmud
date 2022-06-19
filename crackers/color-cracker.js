/**
 * Cracks c001, c002 and c003 locks.
 * @param {Object} context Context.
 * @param {Object} args Arguments passed to script.
 *
 * @returns {(String[])} Collection of lock responses.
 */
export default function cracker (context, args) {
    let callLock = answers => args.target.call(answers),
        splitArray = string => string[0].split("|"),
        // Generates an array between 0 and 98
        colors = splitArray`red|orange|yellow|lime|green|cyan|blue|purple`,
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#syntax
        // 'Connection Terminated' is the only 'nn' phrase a lock returns
        connectionTerminatedRegExp = /nn/,
        // '<value> is the wrong <type>' is the only 'th' phrase a lock returns
        paramValueWrongRegExp = /th/,
        colorIndex,
        accessDeniedRegExp = /Denied/,
        i = 0,
        response,
        /** @type string */
        key = "",
        answers = {};

    response = callLock(answers);

    while (!connectionTerminatedRegExp.exec(response)) {

        [ , key = key ] = /.*`N(.*?)`.*$/.exec(response) || [];

        if (accessDeniedRegExp.exec(response)) {
            i = 0;
        } else if (paramValueWrongRegExp.exec(response)) {
            i++;
        }

        if (key[0] !== "c") {
            return response;
        }

        answers[key] = colors[i];
        colorIndex = colors.indexOf(answers[key]);

        switch (key[3]) {
            case "1":
                answers.color_digit = colors[i].length;
                break;
            case "2":
                answers.c002_complement = colors[(colorIndex + 4) % 8];
                break;
            case "3":
                answers[`${key}_triad_1`] = colors[(colorIndex + 5) % 8];
                answers[`${key}_triad_2`] = colors[(colorIndex + 3) % 8];
                break;
        }

        // Call the lock and check the response.
        response = callLock(answers);
    }

    return response;

}
