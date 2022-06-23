export const mochaHooks = {
    beforeAll (done) {
        const noop = () => {};

        global.Hackmud = {
            fs: {
                lore: {
                    data_check: noop
                }
            },
            db: {
                us: noop,
                f: () => ({
                    array: () => [],
                    first: () => {}
                })
            }
        };

        done();
    }
};
