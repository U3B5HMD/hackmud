// @ts-nocheck
/**
 * @filedesc Updates a user's MongoDB with the list of known corporations.
 */
import Hackmud from "../src/hackmud";

export default function corporations () {
    Hackmud.db.us(
        { _id: "corporations" },
        {
            $set: {
                data: [
                    "amal_robo",
                    "aon",
                    "archaic",
                    "bluebun",
                    "bunnybat_hut",
                    "context",
                    "core",
                    "cyberdine",
                    "empty_nest",
                    "etceteraco",
                    "futuretech",
                    "goodfellow",
                    "halperyon",
                    "hyperion",
                    "kill_9_1",
                    "kill_bio",
                    "legion_bible",
                    "legion_intl",
                    "light",
                    "lowell_extermination",
                    "marco_polo",
                    "merrymoor_pharma",
                    "nation_of_wales",
                    "nidus",
                    "nogrub",
                    "nuutec",
                    "pica",
                    "protein_prevention",
                    "ros_13_update_checker",
                    "ros13",
                    "setec_gas",
                    "skimmerite",
                    "sn_w",
                    "soylentbean",
                    "subject_object",
                    "suborbital_airlines",
                    "tandoori",
                    "the_holy_checksum",
                    "turing_testing",
                    "tyrell",
                    "vacuum_rescue",
                    "weathernet",
                    "welsh_measles_info",
                    "weyland",
                    "world_pop"
                ]
            }
        }
    );

    return Hackmud.db.f({ _id: "corporations" }).array();
}
