const header = [
    "#   /$$$$$$$$ /$$      /$$ /$$   /$$          /$$$$$$   /$$$$$$  /$$$$$$$  /$$$$$$$ ",
    "#  | $$_____/| $$$    /$$$| $$  | $$         /$$__  $$ /$$__  $$| $$__  $$| $$__  $$",
    "#  | $$      | $$$$  /$$$$| $$  | $$        | $$  \__/| $$  \ $$| $$  \ $$| $$  \ $$",
    "#  | $$$$$   | $$ $$/$$ $$| $$  | $$ /$$$$$$| $$      | $$  | $$| $$$$$$$/| $$$$$$$/",
    "#  | $$__/   | $$  $$$| $$| $$  | $$|______/| $$      | $$  | $$| $$__  $$| $$____/ ",
    "#  | $$      | $$\  $ | $$| $$  | $$        | $$    $$| $$  | $$| $$  \ $$| $$      ",
    "#  | $$$$$$$$| $$ \/  | $$|  $$$$$$/        |  $$$$$$/|  $$$$$$/| $$  | $$| $$      ",
    "#  |________/|__/     |__/ \______/          \______/  \______/ |__/  |__/|__/      ",
    "#                                                                                   ",
    "#                                                                                   ",
    "#",
    "Welcome to EMU-CORP public information script. Please refrain from engaging in criminal activity.",
    "latest | strategy | "
].join("\n");

/**
 * @classdesc Emulates a corporation script
 *
 * @memberof emulators
 */
class Corporation {
    constructor () {
        this.header = header;
        this.password = "endtheworld";
        this.secretCommand = "employees";
        this.projects = [
            "forgetme_nt",
            "giant_spidr",
            "dsktp_mngr",
            "delete_me_first",
            "cloudskimmer.da7a",
            "empl_pages",
            "judgeme_nt"
        ];
    }
    /**
     * Returns the ASCII art and commands for the corporation.
     * @returns {String} Corporation header message.
     */
    printHeader () {
        return this.header;
    }
    /**
     * Returns instructions for how to access the corporation.
     * @returns {String} Instructions.
     */
    printInstructions () {
        return [
            `Please specify a command with command:"<command name>"`,
            `Public commands are "strategy" "latest"`,
            `-- access directory with command:"employees"`
        ].join("\n");
    }
    /**
     * Returns the blog posts/projects for the corporation.
     * @returns {String[]} Blog posts.
     */
    printProjects () {
        return [
            [
                "2061AD D227",
                "New employees must report all breaks, includi§g but not limited to biological breaks."
            ],
            [
                "2061AD D194",
                "For our friends in©the Corrupted community: Happy Pittsday! May the Lost Sectors Be Restored, May the Filetable Be Made Whole."
            ],
            [
                "2061AD D149",
                "giant_spidr announces beta testing pe©iod starting today."
            ],
            [
                "2061AD D103",
                "The coffee machine on the second f¡oor is broken again"
            ],
            [
                "2061AD D100",
                "New employees must report all breaks, including but not limited to biological ¦reaks."
            ],
            [
                "2061AD D32",
                "The coffee Machine on the second floor is brok©n again. I've contacted clarence already."
            ],
            [
                "2060AD D333",
                "REMIND¨R: All buildings will be evacuated and systems unresponsive on Dec 31 23:00 GMT for the rOS 13.0 rollover. Do not ©lan on open connections for at least twenty minutes after the update window."
            ],
            [
                "2060AD D6",
                "indie_jones of project dsktp_mngr has come clean about the cancellatiÃn of her product.  'We just can't justify the cost.' she said."
            ],
            [
                "2060AD D18¢",
                "Feral bunnybat¤attacks have been reported in the west garages after nightfall.  Employees are encouraged to stick to lighted areas and carry their employer-supplied mace."
            ],
            [
                "2059AD D246",
                "Protein Prevention Party is pleased to announce that the initial launch of the W3rla3NDER software is awild success."
            ],
            [
                "2059AD D103",
                "Protein Prevention Pa¨ty internal devel¡pment team has announced the release date for 101010. Protein Prevention Party declined to comment on the environmental ramifications of its production."
            ],
            [
                "2057AD D317",
                "'We've got the bad guys on the run!' -- rey_tr4cer when being asked about new developments on delete_me_first progress"
            ],
            [
                "2057AD D56",
                "Fans continue to fund fake backstarters for judgeme_nt Áince it was discontinued."
            ],
            [
                "2057AD D66",
                "Fo¡lowing critical review of forgetme_nt, the project has been cancelled."
            ],
            [
                "2056AD D322",
                "Following critical review of cloudskimmer.da7a, the project has been cancelled."
            ],
            [
                "2057AD D219",
                "Internal adoption continues to ri¢e for the new empl_pages initiative."
            ]

        ].map(entry => entry.join("\n"));
    }
    /**
     * Returns the phrase that contains the password for the corp.
     * @returns {String} Password phrase.
     */
    printPassword () {
        return [
            "User-Obsessive Design for Hypertargete© Applications-- EMU-CORP",
            `We are calling this strategy ${this.password} and we will continue to strive to deliver.`
        ].join("\n");
    }
    /**
     * Returns the NPC locs held by the corporation.
     * @returns {String[]} Locs
     */
    printLocs () {
        return [
            "abndnd_m2j0yc.access_0fcpi1",
            "abndnd_jrttl.extern_5gqzpi3",
            "uknown_4325l.runnrs_42gzp3y"
        ];
    }
    /**
     * Returns an emulated response based on what args are passed in
     * @param {Object} [args] The args to access the corp with
     * @returns {(String|String[])} The response from the corp
     */
    call (args) {
        const {
            password,
            project,
            command
        } = args || {};

        if (!args) {
            return this.printHeader();
        }

        if (Object.keys(args).length === 0) {
            return this.printInstructions();
        }

        if (command === "strategy") {
            return this.printPassword();
        }

        if (command === "latest") {
            return this.printProjects();
        }

        if (command === this.secretCommand && !password) {
            return "No password specified.";
        }

        if (command === this.secretCommand && password !== this.password) {
            return "Incorrect password.";
        }

        if (command === this.secretCommand && password === this.password && !project) {
            return "Authenticated. Please specify a project to get a member list.";
        }

        if (command === this.secretCommand && password === this.password && this.projects.includes(project)) {
            return this.printLocs();
        }

        return this.printHeader();
    }
}

export default Corporation;