import Lock from "../src/lock.js";
/**
 * @classdesc Emulates a loc.
 * @memberof emulators
 */
class Loc {
    /**
     * @param {Object} config Configuration for the loc.
     * @param {Array} config.locks The locks that defend the loc.
     */
    constructor (config) {
        const {
            locks
        } = config;

        this.locks = locks;

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
        let error = false;
        let lockMsg;
        let result = [];

        do {
            lockMsg = this.locks[i].unlock(args);
            error = lockMsg.includes(Lock.LOCK_ERROR);

            result = result.concat(lockMsg);
            i++;
        }
        while (this.locks[i] && !error);

        if (!error) {
            result = result.concat(this.CONNECTION_TERMINATED);
        }

        return result.join(Lock.MSG_LINE_SEPERATOR);
    }
}

export default Loc;