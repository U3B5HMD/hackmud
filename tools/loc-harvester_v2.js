export default function locHarvester (context, args) {
    let call = params => args.t.call(params || {}),
        locs = [],
        cmd = "",
        orderData,
        scriptResponse,
        usernames = [
            "3rd_3y3_grill",
            "amelie",
            "bassy_thecount",
            "be_lavar",
            "bella_swan",
            "bobranator",
            "boris",
            "c_vader",
            "catness",
            "chad_bose",
            "cking",
            "corg_train",
            "corgitruthsayer",
            "d4ria",
            "daa_freak",
            "daurmith",
            "delete_me_first",
            "diamond_dogz",
            "doc_brown",
            "firebreathingdragon",
            "frantimike",
            "free_man_morg",
            "geyser_sore",
            "h4chguy",
            "hermione",
            "ice_ventura",
            "indie_jones",
            "inigo",
            "jack_sparrow",
            "jamesb",
            "jermaine",
            "juno_macguff",
            "leon",
            "luke_5kywalker",
            "m_clarke_dunk",
            "m_poppins",
            "madthugpug",
            "mjay_m_walker",
            "oz",
            "poitier_27",
            "pugluv4vr",
            "rocky_b",
            "runningman23",
            "sammy_l_jack",
            "shareef_j",
            "shawn_aa",
            "sportsfan2031",
            "terrance_cruz",
            "thedude",
            "thegreat",
            "thepowerful",
            "troy_cole",
            "universe",
            "whois_hermano",
            "wiley_curry",
            "will_de_vaughn",
            "wonderous_steve",
            "youngtwokay"
        ];

    for (let i = 0; i < usernames.length; i++) {
        scriptResponse = call({ username: usernames[i] });

        if (/.ot|n.t|no./.test(scriptResponse)) {
            continue;
        }

        let [ , command ] = /`N([a-z0-9_]+)`/m.exec(scriptResponse) || [];

        cmd = cmd || command;

        orderData = Hackmud.fs.dtr.qr({ t: args.t, a: {
            username: usernames[i],
            [cmd]: "order_qrs"
        } });

        orderData.forEach(order => {
            scriptResponse = call({
                username: usernames[i],
                [command]: "cust_service",
                order_id: order.id
            }).split(":")[1];

            if (scriptResponse) {
                scriptResponse = scriptResponse.split("\n")[0].split(" ").slice(1);
                locs = locs.concat(scriptResponse);
            }
        });
    }

    return locs.filter(loc => !/[^a-z0-9_\.]/.test(loc)).sort();

}
