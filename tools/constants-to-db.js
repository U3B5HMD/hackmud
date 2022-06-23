/**
 * @filedesc Updates a user's MongoDB with the data necessary to run various
 * omni-crackers.
 */
import Hackmud from "../src/hackmud";

export default function constants () {
    Hackmud.db.us(
        { _id: "constants" },
        {
            $set: {
                E: [
                    "unlock",
                    "release",
                    "open"
                ],
                d: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
                e: [
                    2, 3, 5, 7, 11, 13, 17,
                    19, 23, 29, 31, 37, 41,
                    43, 47, 53, 59, 61, 67,
                    71, 73, 79, 83, 89, 97
                ],
                l: [
                    "vc2c7q",
                    "cmppiq",
                    "tvfkyq",
                    "uphlaw",
                    "6hh8xw",
                    "xwz7ja",
                    "sa23uw",
                    "72umy0"
                ],
                c: [
                    "red",
                    "orange",
                    "yellow",
                    "lime",
                    "green",
                    "cyan",
                    "blue",
                    "purple"
                ]
            }
        }
    );

    return Hackmud.db.f({ _id: "constants" }).array();
}
