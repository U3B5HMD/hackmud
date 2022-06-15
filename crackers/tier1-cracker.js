/**
 * @file A lock cracker for EZ_21, EZ_35, EZ_40, C001, C002, C003, and l0cket locks.
 *
 * 494 Characters, minified.
 */

/**
 * Cracks EZ_21, EZ_35, EZ_40, C001, C002, C003, and l0cket locks.
 * @param {Object} context Context.
 * @param {Object} args Arguments passed to script.
 *
 * @returns {(String[])} Collection of lock responses.
 */
export default function cracker (context, args) {
    let callLock = answers => args.t.call(answers),
        split = string => string[0].split("|"),
        // Every number between 0 and 98
        digits = [ ...Array(98).keys() ],
        // The Hackmud color wheel
        colors = split`red|orange|yellow|lime|green|cyan|blue|purple`,
        values = {
            l: split`vc2c7q|cmppiq|tvfkyq|uphlaw|6hh8xw|xwz7ja|sa23uw|72umy0`,
            E: split`unlock|open|release`,
            d: digits,
            e: digits.filter(prime => [ 2, 3, 5, 7 ]
                .every(mod => prime == mod || prime % mod))
        },
        answers = {},
        i = 0,
        set,
        /** @type {any} */
        key,
        lastKey,
        response = callLock(answers);

    while (!/nn/.exec(response)) {
        // Check for a string wrapped in blue text (key).
        // If we don't find one, stick with the previously found key.
        lastKey = key;
        [ , key = key ] = /.*`N(.*?)`.*$/.exec(response) || [];

        set = values[key[0]];

        // We are dealing with a color lock
        if (!set) {
            // Key is c001, c002, or c003
            if (!/_/.test(key)) {
                // Just choose the nex color in the list
                answers[key] = colors[i];
            } else {
                answers[key] = key[3] > 1
                    ? colors[(
                        colors.indexOf(answers[lastKey])
                        // c002_complement
                        + (key[3] == 2 ? 4
                            // c003_triad_2
                            : key[11] > 1 ? 3
                            // c003_triad_1
                                : 5
                        )
                    ) % 8]
                    : answers[lastKey].length;
            }
        } else {
            answers[key] = set[i];
        }

        // Call the lock and check the response.
        response = callLock(answers);
        i = /th/.exec(response) ? i + 1 : 0;
    }

    return response;
}
