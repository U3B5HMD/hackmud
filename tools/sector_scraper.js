/**
 * Scrapes sectors looking for corp scripts.
 * @param {Object} context Context.
 * @param {Object} args Arguments passed to the script.
 * @param {Number} [args.tier=1] What tier of corps to look for.
 * @param {Number} [args.start=0] Where in the array of sectors to start looking.
 *
 * @returns {Array} Array of corp scripts
 */
export default function (context, args) {
    let
        sectorStart = args.start || 0,
        tier = args.tier || 1,
        scriptList = [],
        sector = "s",
        results = [],
        sectorList = [],
        runFullSec = params => Hackmud.fs.scripts.fullsec(params),
        runHighSec = params => Hackmud.fs.scripts.highsec(params),
        runMidSec = params => Hackmud.fs.scripts.midsec(params),
        runLowSec = params => Hackmud.fs.scripts.lowsec(params),
        runNullSec = params => Hackmud.fs.scripts.nullsec(params),
        i;

    const runSectors = sectorFunction => {
        i = 0;
        sectorList = sectorFunction().slice(sectorStart, sectorStart + 11);

        for (;sectorList[i]; i++) {
            sector = sectorList[i];

            Hackmud.ms.chats.join({ channel: sector });

            scriptList = scriptList.concat(sectorFunction({ sector: sector }));

            Hackmud.ms.chats.leave({ channel: sector });
        }

        return scriptList;
    };

    if (tier == 1) {
        results = results
            .concat(runSectors(runFullSec))
            .filter(scriptName => /\.public$/.exec(scriptName));

    }

    if (tier == 2) {
        results = results
            .concat(runSectors(runHighSec), runSectors(runMidSec))
            .filter(scriptName => /\.(?:members|members_only|member_access|memberlogin)$/.exec(scriptName));
    }

    if (tier === 3) {
        results = results
            .concat(runSectors(runLowSec), runSectors(runNullSec))
            .filter(scriptName => /\.(?:employee_login|emplogin|employees|priv)$/.exec(scriptName));
    }

    return [ ...new Set(results) ].sort();
}
