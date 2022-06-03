import { expect } from "chai";
import Hackmud, { sectors, scripts } from "../src/hackmud.js";
import { securityLevelNames } from "../src/constants.js";

describe("Hackmud", () => {
    it("should have an 'fs' property", () => {
        expect(Hackmud.fs).to.be.an("object");
    });

    it("should have an 'ms' property", () => {
        expect(Hackmud.ms).to.be.an("object");
    });

    describe("fs", () => {
        it("should have a 'lib' function", () => {
            expect(Hackmud.fs.lib).to.be.a("function");
        });

        it("should have a 'scripts' property", () => {
            expect(Hackmud.fs.scripts).to.be.an("object");
        });
    });

    describe("fs.lib", () => {
        it("should return an object", () => {
            expect(Hackmud.fs.lib()).to.be.an("object");
        });

        it("should have an 'ok' method", () => {
            expect(Hackmud.fs.lib().ok).to.be.a("function");
        });

        it("should have an 'not_impl' method", () => {
            expect(Hackmud.fs.lib().not_impl).to.be.a("function");
        });

        it("should have an 'log' method", () => {
            expect(Hackmud.fs.lib().log).to.be.a("function");
        });

        it("should have an 'get_log' method", () => {
            expect(Hackmud.fs.lib().get_log).to.be.a("function");
        });

        it("should have an 'rand_int' method", () => {
            expect(Hackmud.fs.lib().rand_int).to.be.a("function");
        });

        it("should have an 'are_ids_eq' method", () => {
            expect(Hackmud.fs.lib().are_ids_eq).to.be.a("function");
        });

        it("should have an 'is_obj' method", () => {
            expect(Hackmud.fs.lib().is_obj).to.be.a("function");
        });

        it("should have an 'is_num' method", () => {
            expect(Hackmud.fs.lib().is_num).to.be.a("function");
        });

        it("should have an 'is_int' method", () => {
            expect(Hackmud.fs.lib().is_int).to.be.a("function");
        });

        it("should have an 'is_arr' method", () => {
            expect(Hackmud.fs.lib().is_arr).to.be.a("function");
        });

        it("should have an 'is_def' method", () => {
            expect(Hackmud.fs.lib().is_def).to.be.a("function");
        });

        it("should have an 'is_valid_name' method", () => {
            expect(Hackmud.fs.lib().is_valid_name).to.be.a("function");
        });

        it("should have an 'dump' method", () => {
            expect(Hackmud.fs.lib().dump).to.be.a("function");
        });

        it("should have an 'clone' method", () => {
            expect(Hackmud.fs.lib().clone).to.be.a("function");
        });

        it("should have an 'merge' method", () => {
            expect(Hackmud.fs.lib().merge).to.be.a("function");
        });

        it("should have an 'get_values' method", () => {
            expect(Hackmud.fs.lib().get_values).to.be.a("function");
        });

        it("should have an 'hash_code' method", () => {
            expect(Hackmud.fs.lib().hash_code).to.be.a("function");
        });

        it("should have an 'to_gc_str' method", () => {
            expect(Hackmud.fs.lib().to_gc_str).to.be.a("function");
        });

        it("should have an 'to_gc_num' method", () => {
            expect(Hackmud.fs.lib().to_gc_num).to.be.a("function");
        });

        it("should have an 'to_game_timestr' method", () => {
            expect(Hackmud.fs.lib().to_game_timestr).to.be.a("function");
        });

        it("should have an 'cap_str_len' method", () => {
            expect(Hackmud.fs.lib().cap_str_len).to.be.a("function");
        });

        it("should have an 'each' method", () => {
            expect(Hackmud.fs.lib().each).to.be.a("function");
        });

        it("should have an 'select' method", () => {
            expect(Hackmud.fs.lib().select).to.be.a("function");
        });

        it("should have an 'count' method", () => {
            expect(Hackmud.fs.lib().count).to.be.a("function");
        });

        it("should have an 'select_one' method", () => {
            expect(Hackmud.fs.lib().select_one).to.be.a("function");
        });

        it("should have an 'map' method", () => {
            expect(Hackmud.fs.lib().map).to.be.a("function");
        });

        it("should have an 'shuffle' method", () => {
            expect(Hackmud.fs.lib().shuffle).to.be.a("function");
        });

        it("should have an 'sort_asc' method", () => {
            expect(Hackmud.fs.lib().sort_asc).to.be.a("function");
        });

        it("should have an 'sort_desc' method", () => {
            expect(Hackmud.fs.lib().sort_desc).to.be.a("function");
        });

        it("should have an 'add_time' method", () => {
            expect(Hackmud.fs.lib().add_time).to.be.a("function");
        });

        it("should have an 'security_level_names' property", () => {
            expect(Hackmud.fs.lib().security_level_names)
                .to.deep.equal(securityLevelNames);
        });

        it("should have an 'get_security_level_name' method", () => {
            expect(Hackmud.fs.lib().get_security_level_name).be.a("function");
        });

        it("should have an 'create_rand_string' method", () => {
            expect(Hackmud.fs.lib().create_rand_string).be.a("function");
        });

        it("should have an 'get_user_from_script' method", () => {
            expect(Hackmud.fs.lib().get_user_from_script).be.a("function");
        });

        it("should have an 'u_sort_num_arr_desc' method", () => {
            expect(Hackmud.fs.lib().u_sort_num_arr_desc).be.a("function");
        });

        it("should have an 'can_continue_execution' method", () => {
            expect(Hackmud.fs.lib().can_continue_execution).be.a("function");
        });

        it("should have an 'can_continue_execution_error' method", () => {
            expect(Hackmud.fs.lib().can_continue_execution_error).be.an("object");
        });

        it("should have an 'get_date' method", () => {
            expect(Hackmud.fs.lib().get_date).be.a("function");
        });

        it("should have an 'get_date_utcsecs' method", () => {
            expect(Hackmud.fs.lib().get_date_utcsecs).be.a("function");
        });
    });

    describe("fs.scripts", () => {
        it("should have a 'fullsec' function", () => {
            expect(Hackmud.fs.scripts.fullsec).to.be.a("function");
        });

        it("should have a 'midsec' function", () => {
            expect(Hackmud.fs.scripts.midsec).to.be.a("function");
        });
    });

    describe("fs.scripts.fullsec", () => {
        context("when called with no params", () => {
            it("should return an array of sectors", () => {
                expect(Hackmud.fs.scripts.fullsec()).deep.equal(sectors);
            });
        });

        context("when called with a sector", () => {
            it("should return an array of sectors", () => {
                expect(Hackmud.fs.scripts.fullsec({
                    sector: sectors[0]
                })).deep.equal(scripts);
            });
        });
    });

    describe("fs.scripts.midsec", () => {
        it("should return an array of scripts", () => {
            expect(Hackmud.fs.scripts.midsec()).to.be.an("array");
        });
    });
});
