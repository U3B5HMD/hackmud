/**
 * Cracks l0cket locks.
 * @param {Object} context Context.
 * @param {Object} args Arguments passed to script.
 *
 * @returns {(String[])} Collection of lock responses.
 */
export default function cracker (context, args) {
    let callLock = answers => args.target.call(answers),
        splitArray = string => string[0].split("|"),
        lockets = splitArray`vc2c7q|cmppiq|tvfkyq|uphlaw|6hh8xw|xwz7ja|sa23uw|72umy0`,
        response,
        key,
        i = 0,
        answers = {};

    while (!/nn/.exec(response)) {
        // Call the lock and check the response.
        response = callLock(answers);
        // Check for a string wrapped in blue text (key).
        // If we don't find one, stick with the previously found key.
        [ , key = key ] = /.*`N(.*?)`.*$/.exec(response) || [];

        if (key !== "l0cket") {
            return response;
        }

        answers[key] = lockets[i];
        // "X is not the correct Y" is the only phrase with 'th' in it
        // that a lock will produce.
        if (/th/.exec(response)) {
            // Increment to the next possible value.
            i++;
        }
    }

    return response;
}
