/* global _START */
import Hackmud from "../src/hackmud.js";

export default function omniCracker (context, args = {}) {
    let scriptor = args.t,
        callLock = params => scriptor.call(params),
        /** @type any */
        key,
        response,
        colorIndex,
        data,
        answers = {},
        i = 0,
        stateId = scriptor.name,
        constants = Hackmud.db.f({ _id: "constants" }).first(),
        state = Hackmud.db.f({ _id: stateId }).first();

    if (state) {
        answers = { ...state };
    }

    response = callLock({ ...answers });

    while (!/nn/.exec(response)) {
        [ , key = key ] = /.*`N(.*?)`.*$/.exec(response) || [];

        if (Date.now() - _START >= 4500) {
            Hackmud.db.us({ _id: stateId }, { $set: { value: answers } });
            return response;
        }

        switch (key[0]) {
            case "e":
            case "d":
            case "E":
            case "l":
                answers[key] = constants[key[0]][i];
                break;
            case "D":
                answers[key] = "";
                data = Hackmud.fs.lore.data_check({ lookup: callLock(answers) });
                answers[key] = data.answer;
                break;
            case "c":
                answers[key] = constants[key[0]][i];
                colorIndex = key[3];

                if (colorIndex > 2) {
                    answers.c003_triad_1 = constants.c[
                        (constants.c.indexOf(answers.c003) + 5) % 8
                    ];
                    answers.c003_triad_2 = constants.c[
                        (constants.c.indexOf(answers.c003) + 3) % 8
                    ];
                }

                if (colorIndex > 1) {
                    answers.c002_complement = constants.c[
                        (constants.c.indexOf(answers.c002) + 4) % 8
                    ];
                } else {
                    answers.color_digit = answers.c001.length;
                }
                break;
            default:
                return response;
        }

        response = callLock({ ...answers });

        i = /th/.exec(response) ? i + 1 : 0;
    }

    return response;
}
