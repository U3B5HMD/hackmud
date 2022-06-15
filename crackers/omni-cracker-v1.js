/* global _START*/
import Hackmud from "../src/hackmud";

export default function omniCracker (context, args) {
    let callLock = params => args.t.call(params),
        /** @type any */
        key,
        response = callLock({}),
        data,
        answers = {},
        i = 0,
        constants = Hackmud.db.f({ _id: "constants" }).first();

    while (!/nn/.exec(response)) {
        [ , key = key ] = /.*`N(.*?)`.*$/.exec(response) || [];

        if (Date.now() - _START >= 4750) {
            return response;
        }

        switch (key) {
            case "ez_prime":
            case "digit":
            case "EZ_21":
            case "EZ_35":
            case "EZ_40":
            case "l0cket":
                answers[key] = constants[key[0]][i];
                break;
            case "DATA_CHECK":
                answers[key] = "";
                data = Hackmud.fs.lore.data_check({ lookup: callLock(answers) });
                answers[key] = data.answer;
                break;
            case "c001":
                answers[key] = constants[key[0]][i];
                answers.color_digit = answers.c001.length;
                break;
            case "c002":
                answers[key] = constants[key[0]][i];
                answers.c002_complement = constants.c[
                    (constants.c.indexOf(answers.c002) + 4) % 8
                ];
                break;
            case "c003":
                answers[key] = constants[key[0]][i];
                answers.c003_triad_1 = constants.c[
                    (constants.c.indexOf(answers.c003) + 5) % 8
                ];
                answers.c003_triad_2 = constants.c[
                    (constants.c.indexOf(answers.c003) + 3) % 8
                ];
                break;
            default:
                return response;
        }

        response = callLock(answers);

        i = /th/.exec(response) ? i + 1 : 0;
    }

    return response;
}
