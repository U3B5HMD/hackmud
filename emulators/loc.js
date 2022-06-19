import Lock from "../src/lock.js";
/**
 * @classdesc Emulates a loc.
 * @memberof emulators
 */
class Loc {
    /**
     * @param {Object} config Configuration for the loc.
     * @param {Array} config.locks The locks that defend the loc.
     * @param {String} [config.name="loc"] The script name of the loc.
     */
    constructor (config) {
        const {
            locks,
            name = "loc"
        } = config;

        this.locks = locks;
        this.name = name;

        this.CONNECTION_TERMINATED = "`rConnection` Terminated";
    }
    /**
     * Attempts to crack each lock using the passed in arguments
     * @param {Object} args Arguments that will be used to crack the locks.
     *
     * @returns {String} A collection of messages from each lock.
     */
    call (args) {
        let i = 0;
        let lockMsg;
        let result = [];

        for (i = 0; i < this.locks.length; i++) {
            lockMsg = this.locks[i].unlock(args);
            result = result.concat(lockMsg);

            if (!this.locks[i].isBreached) {
                break;
            }
        }

        if (this.locks.every(lock => lock.isBreached)) {
            result = result.concat(this.CONNECTION_TERMINATED);
        }

        return result.join(Lock.MSG_LINE_SEPERATOR);
    }
}

export default Loc;
