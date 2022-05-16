/* eslint-disable no-unused-vars */
import { securityLevelNames } from "../src/constants";

const noop = () => {};

export const scripts = [
    "script.db",
    "test.pub_432323",
    "emucorp.public"
];

export const sectors = [
    "EPSILON_5"
];

class Hackmud {
    static D = val => {};
    static db = {
        // eslint-disable-next-line no-unused-vars
        f: query => ({
            array: () => [],
            first: () => ({})
        })
    };
    static fs = {
        scripts: {
            /**
             * Returns a list of FULLSEC sectors or FULLSEC scripts
             * @param {Object} [params] Configuration options.
             * @param {String} params.sector The sector to search for scripts in.
             * @returns {String[]} FULLSEC sectors.
             */
            fullsec: params => {
                if (params && params.sector) {
                    return scripts;
                }

                return sectors;
            },
            /**
             * Returns a list of HIGHSEC sectors or HIGHSEC scripts
             * @param {Object} [params] Configuration options.
             * @param {String} params.sector The sector to search for scripts in.
             * @returns {String[]} HIGHSEC sectors.
             */
            highsec: params => {
                if (params && params.sector) {
                    return scripts;
                }

                return sectors;
            },
            /**
             * Returns a list of MIDSEC sectors or MIDSEC scripts
             * @param {Object} [params] Configuration options.
             * @param {String} params.sector The sector to search for scripts in.
             * @returns {String[]} MIDSEC sectors.
             */
            midsec: params => {
                if (params && params.sector) {
                    return scripts;
                }

                return sectors;
            },
            /**
             * Returns a list of LOWESEC sectors or LOWESEC scripts
             * @param {Object} [params] Configuration options.
             * @param {String} params.sector The sector to search for scripts in.
             * @returns {String[]} LOWESEC sectors.
             */
            lowsec: params => {
                if (params && params.sector) {
                    return scripts;
                }

                return sectors;
            },
            /**
             * Returns a list of NULLSEC sectors or NULLSEC scripts
             * @param {Object} [params] Configuration options.
             * @param {String} params.sector The sector to search for scripts in.
             * @returns {String[]} NULLSEC sectors.
             */
            nullsec: params => {
                if (params && params.sector) {
                    return scripts;
                }

                return sectors;
            }
        },
        lib: () => ({
            add_time: noop,
            are_ids_eq: noop,
            can_continue_execution: noop,
            can_continue_execution_error: {},
            cap_str_len: noop,
            clone: noop,
            count: noop,
            create_rand_string: noop,
            dump: noop,
            each: noop,
            get_date_utcsecs: noop,
            get_date: noop,
            get_log: noop,
            get_security_level_name: noop,
            get_user_from_script: noop,
            get_values: noop,
            hash_code: noop,
            is_arr: noop,
            is_def: noop,
            is_int: noop,
            is_num: noop,
            is_obj: noop,
            is_valid_name: noop,
            is_valid: noop,
            log: noop,
            map: noop,
            merge: noop,
            not_impl: noop,
            ok: noop,
            rand_int: noop,
            security_level_names: securityLevelNames,
            select_one: noop,
            select: noop,
            shuffle: noop,
            sort_asc: noop,
            sort_desc: noop,
            to_game_timestr: noop,
            to_gc_num: noop,
            to_gc_str: noop,
            u_sort_num_arr_desc: noop
        })
    };
    static ms = {};
}

export default Hackmud;