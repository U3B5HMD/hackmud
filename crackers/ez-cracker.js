/**
 * Cracks EZ_21, EZ_35 and EZ_40 locks.
 * @param {Object} context Context.
 * @param {Object} args Arguments passed to script.
 *
 * @returns {(String[])} Collection of lock responses.
 */
export default function cracker (context, args) {
    let callLock = answers => args.target.call(answers),
        splitArray = string => string[0].split("|"),
        // Generates an array between 0 and 98
        digits = [ ...Array(98).keys() ],
        unlockCommands = splitArray`unlock|open|release`,
        primes = digits.filter(prime => [ 2, 3, 5, 7 ]
            .every(mod => prime == mod || prime % mod)),
        connectionTerminatedRegExp = /nn/,
        paramValueWrongRegExp = /th/,
        paramMissingRegExp = /missing/,
        accessDeniedRegExp = /Denied/,
        i = 0,
        response,
        key,
        answers = {};

    while (!connectionTerminatedRegExp.exec(response)) {
        // Call the lock and check the response.
        response = callLock(answers);

        [ , key = key ] = /.*`N(.*?)`.*$/.exec(response) || [];

        if (
            accessDeniedRegExp.exec(response)
            || paramMissingRegExp.exec(response)
        ) {
            i = 0;
        } else if (paramValueWrongRegExp.exec(response)) {
            i++;
        }

        switch (key) {
            case "EZ_21":
            case "EZ_35":
            case "EZ_40":
                answers[key] = unlockCommands[i];
                break;
            case "digit":
                answers[key] = digits[i];
                break;
            case "ez_prime":
                answers[key] = primes[i];
                break;
            default:
                return response;
        }
    }

    return response;

}
