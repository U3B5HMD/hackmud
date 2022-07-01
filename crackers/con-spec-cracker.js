/**
 * Cracks a CON_SPEC lock.
 * @param {Object} context Context.
 * @param {Object} args Arguments passed to script.
 *
 * @returns {(String[])} Collection of lock responses.
 */
export default function conSpecCracker (context, args) {
    let call = params => args.t.call(params),
        conspecPatterns = [
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "ZYXWVUTSRQPONMLKJIHGFEDCBA",
            "ACEGIKMOQSUWY",
            "BDFHJLNPRTVXZ",
            "ZXVTRPNLJHFDB",
            "YWUSQOMKIGECA",
            "ABEFIJMNQRUVYZ",
            "BCFGJKNORSVWZ",
            "CDGHKLOPSTWX",
            "ADEHILMPQTUXY",
            "ZYVURQNMJIFEBA",
            "YXUTQPMLIHEDA",
            "XWTSPOLKHGDC",
            "ZWVSRONKJGFCB"
        ],
        response = call({ CON_SPEC: "" }),
        letters = response.split("\n")[0],
        pattern = conspecPatterns.find(conspecPattern =>
            conspecPattern.indexOf(letters) > -1
        ),
        patternStart = pattern.indexOf(letters),
        nextLetters = pattern.substring(
            patternStart + letters.length,
            patternStart + letters.length + 3
        );

    return call({ CON_SPEC: nextLetters });
}
