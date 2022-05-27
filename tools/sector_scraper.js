import Hackmud from "../src/hackmud";

export default function (context, args) {
    let
        sectorStart = args.start || 0,
        tier = args.tier || 1,
        scriptList = [],
        sector = "s",
        results = [],
        sectorList = [],
        i;

    const runSectors = sectorFunction => {
        i = 0;
        sectorList = sectorFunction().slice(sectorStart, sectorStart + 11);

        for (;sector; i++) {
            sector = sectorList[i];

            Hackmud.ms.chats.join({ channel: sector });

            scriptList = scriptList.concat(sectorFunction({ sector: sector })
                .filter(scriptName =>
                    /\.public|private|member|access/.exec(scriptName)
                ));

            Hackmud.ms.chats.leave({ channel: sector });
        }

        return scriptList;
    };

    if (tier == 1) {
        results = results.concat(
            runSectors(params => Hackmud.fs.scripts.fullsec(params))
        );
    }

    if (tier == 2) {
        results = results.concat(
            runSectors(params => Hackmud.fs.scripts.highsec(params)),
            runSectors(params => Hackmud.fs.scripts.midsec(params)),
        );
    }

    return [...new Set(results)].sort();
}