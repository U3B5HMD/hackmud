# Hacking Guide

This is a guide for how to find NPC locs and break into them to earn [GC][01].
This guide assumes that you have already configured the repository to connect
to your Hackmud users' scripts folders and have run `npm run publish` to publish
all existing scripts to your users' accounts. If you haven't done this yet,
review the instructions in the README.

## Table of Contents
- [Sectors](#sectors)
  * [Overview](#overview)
  * [How to Search a Sector](#how-to-search-a-sector)
- [How to Find Tier 1 Corporations in a Sector](#how-to-find-tier-1-corporations-in-a-sector)
- [How to Find Tier 2 Corporations in a Sector](#how-to-find-tier-2-corporations-in-a-sector)
- [How to Find Tier 3 Corporations in a Sector](#how-to-find-tier-3-corporations-in-a-sector)
- [How to Hack a Tier 1 Corporation](#how-to-hack-a-tier-1-corporation)
  * [Get the Key and Secret Page](#get-the-key-and-secret-page)
  * [Get the Password](#get-the-password)
  * [Get a List of Projects](#get-a-list-of-projects)
  * [Search the Projects for Locs](#search-the-projects-for-locs)
- [How to Hack a Tier 2 Corporation](#how-to-hack-a-tier-2-corporation)
  * [Helpful Scripts](#helpful-scripts)
- [How to Breach an NPC](#how-to-breach-an-npc)
- [How to Determine NPC Difficulty and Upgrades](#how-to-determine-npc-difficulty-and-upgrades)
- [How to Determine the Difficulty of a Loc](#how-to-determine-the-difficulty-of-a-loc)
  * [FULLSEC](#fullsec)
  * [MIDSEC](#midsec)
  * [LOWSEC/NULLSEC](#lowsec-nullsec)
- [A List of Corporations](#a-list-of-corporations)
- [How to Crack A Specific Lock](#how-to-crack-a-specific-lock)
- [How to Hack Other Players (PvP)](#how-to-hack-other-players-pvp)
  * [Finding Player Locs](#finding-player-locs)
    + [In a Corporation](#in-a-corporation)
    + [In NPC Access Logs](#in-npc-access-logs)
    + [In Your Access Logs](#in-your-access-logs)
    + [By Running a Scam](#by-running-a-scam)
  * [Breaching Player Defenses](#breaching-player-defenses)
  * [Extracting Resources](#extracting-resources)

## Sectors

### Overview 

A sector is essentially a folder that contains one or more scripts. Each script
in a sector will have the same sec level. For example, when you run
`scripts.fullsec` each script in the listed sectors will have a sec level of
`FULLSEC`, `scripts.midsec` will only list sectors with `MIDSEC` scripts, etc.
Sectors contain both (public) user scripts and NPC corporation scripts. Sectors
do not contain locs. A sector only contains scripts with a sec level equal to
its own. So, a `FULLSEC` sector will not contain `MIDSEC` scripts and vice
versa. 

In order to hack a corporation, you must first find it's script inside of a
sector.

### How to Search a Sector

In order to list all the scripts in a sector, you have to join it first:

```javascript
chats.join{channel: "<sector>"}
```

To list out all FULLSEC scripts in a sector:

```javascript
scripts.fullsec{sector: "<sector>"}
```

Sectors count against the max numbers of channels you can join at a time. To
leave a sector:

```javascript
chats.leave{channel: "<sector>"}
```

## How to Find Tier 1 Corporations in a Sector

Tier 2 corporations exist in `FULLSEC` sectors. Look for scripts that end in
`.public`. Those are most likely going to be corporations. Keep in mind that
`FULLSEC` scripts are safe to run and can't damage your system.

## How to Find Tier 2 Corporations in a Sector

Tier 2 corporations exist in `HIGHSEC` or `MIDSEC` sectors. Look for scripts that
end in `.members`, `members_only`, `member_access`, or `memberlogin`. Those are
most likely going to be corporations. Keep in mind that `MIDSEC` scripts are
capable of stealing GC.

## How to Find Tier 3 Corporations in a Sector

Tier 3 corporations exist in `LOWSEC` and `NULLSEC` sectors. Look for scripts
that end in `.employee_login` `.emplogin`, `.employees`, `.priv`. Those
are most likely going to be corporations. Keep in mind that `LOWSEC` and
`NULLSEC` scripts are capable of stealing GC, exposing your loc, stealing
upgrades, and more.

## How to Hack a Tier 1 Corporation

Once you've found a corporation to hack, run the script without any parameters.
You'll see something like this:

```
#   /$$$$$$$$ /$$      /$$ /$$   /$$          /$$$$$$   /$$$$$$  /$$$$$$$  /$$$$$$$
#  | $$_____/| $$$    /$$$| $$  | $$         /$$__  $$ /$$__  $$| $$__  $$| $$__  $$
#  | $$      | $$$$  /$$$$| $$  | $$        | $$  \__/| $$  \ $$| $$  \ $$| $$  \ $$
#  | $$$$$   | $$ $$/$$ $$| $$  | $$ /$$$$$$| $$      | $$  | $$| $$$$$$$/| $$$$$$$/
#  | $$__/   | $$  $$$| $$| $$  | $$|______/| $$      | $$  | $$| $$__  $$| $$____/
#  | $$      | $$\  $ | $$| $$  | $$        | $$    $$| $$  | $$| $$  \ $$| $$
#  | $$$$$$$$| $$ \/  | $$|  $$$$$$/        |  $$$$$$/|  $$$$$$/| $$  | $$| $$
#  |________/|__/     |__/ \______/          \______/  \______/ |__/  |__/|__/
#
#                                                                                   
#
Welcome to EMU-CORP public information script. Please refrain from engaging in criminal activity.
latest | strategy |
```

This is the splash page of the corporation. Every Tier 1 corporation has a
similar layout. The most important pieces of information are "latest | strategy
|". These are the commands you're going to use to find the passwords and
projects needed to extract NPC locs from the corp. What we're missing right now
is a `key`.

### Get the Key and Secret Page

Run `<corpname>.public{}`. You should see something like this:

```
Please specify a command with command:"<command name>",
Public commands are "strategy" "latest",
-- access directory with command:"employees"
```

<details>
    <summary>Spoilers:</summary>

Now we know two important pieces of information:

1. The `key` we need to use is `command`.
1. The "secret" page is `employees`. 

Run `<corpname>.public{command: "employees"}`:

```
No password specified
```
</details>

### Get the Password

It's time to go find a password. Run: 

```javascript
<corpName>.public{command:"strategy"}
```
And you'll see something like this.

```
User-Obsessive Design for Hypertargete© Applications-- EMU-CORP
We are calling this strategy endtheworld and we will continue to strive to deliver.
```

<details>
    <summary>Spoilers:</summary>

In this example, the password is `endtheworld`. Run: 

```javascript
<corpname>.public{command: "employees", password: "endtheworld"}
```
</details>

If the password is wrong, you will see

```
Incorrect password.
```

If the password is missing, you will see:

```
No password specified.
```

If you see this even after providing a `password` parameter, it means you're not
using the correct parameter. 
<details>
    <summary>Spoilers:</summary>

Tier 1 corps can have three possible password keys:
  - `password`
  - `pass`
  - `p`

Try each one to see what works.  
</details>

If the password is correct, you will see:

```
Authenticated. Please specify a project to get a member list.
```

### Get a List of Projects

Next, provide a project name. To find a list of projects, run:

```javascript
<corpname>.public{command: "latest"}
```

You will something like this:

```
2060AD D6
indie_jones of project dsktp_mngr has come clean about the cancellatiÃn of her product. 'We just can't justify the cost.' she said.
2060AD D18¢
Feral bunnybat¤attacks have been reported in the west garages after nightfall.  Employees are encouraged to stick to lighted areas and carry their employer-supplied mace.
2059AD D246
Protein Prevention Party is pleased to announce that the initial launch of the W3rla3NDER software is awild success.
2059AD D103
Protein Prevention Pa¨ty internal devel¡pment team has announced the release date for 101010. Protein Prevention Party declined to comment on the environmental ramifications of its production.
2057AD D317
'We've got the bad guys on the run!' -- rey_tr4cer when being asked about new developments on delete_me_first progress
```

<details>
    <summary>Spoilers:</summary>
This is a _heavily_ truncated example of a corporation blog. To find projects,
you'll need to read each entry for context clues. In this example, the project
names are `W3rla3NDER` and `delete_me_first`.
</details>

### Search the Projects for Locs

Take each project name and apply it to the corp script:

```javascript
<corpname>.public{command: "employees", password: "mypass", project: "myprojectname"}
```

Each time you run this command, you'll receive a list of NPC [locs][03] for each
project and your system's autocompletes will be updated.

```
anonym_jrttl_znx87h.public_fftgy3
con.pubinfo_eoej39
```

## How to Hack a Tier 2 Corporation

Once you've found a corporation to hack, run the script without any parameters.
You'll see something like this:

```
EMU-Corp member panel

EMU-Corp: the fastest delivery on Earth, guaranteed.  If you don't like it, tell your friends.

enter in your username to continue.
```

This is the splash page of the corporation. Every Tier 2 corporation has a
similar layout. In order to proceed, you'll need to provide a `username` of a
user on the system. In order to get that username, you'll need to run the
`.public` side of the corporation and look through the news updates for
usernames. Usually, it looks something like this:

```
troy_cole of project Ap_calypse has come clean about the cancellation of her product.  'We just can't justify the cost.' she said.

We've got the bad guys on the run!' -- jamesb when being asked about new developments on dr8cii progress.

Anyone know what's up with knowdb? been acting weird lately. r0bertm4rley
```

<details>
    <summary>Spoilers:</summary>

Possible usernames are `r0bertm4rley`, `troy_cole`, and `jamesb`. If none of
these usernames work, you may need to go looking through other corp's `.public`
scripts for usernames. I recommend you keep a list of usernames from each corp
and try them all.

Once you find a working username, you'll see something like this:
</details>

```
Emu-corp member panel
---
navigation
---
account
settings
orders
faq
cust_service
```

<details>
    <summary>Spoilers:</summary>
Run the `faq` command:

```javascript
emucorp.members{username: "troy_cole", navigation: "faq"}
```

You'll see a list of questions and answers. Look for a command (cyan-colored
text) that contains the phrase `qr` or `qrs`. Run that command:

```javascript
emucorp.members{username: "troy_cole", navigation: "order_qrs"}
```
</details>

You'll see a bunch of QR codes that look like this:

<details>
    <summary>Spoilers:</summary>

```
█▀▀▀▀▀█¨▄▄▄  ▄  ▀▄█▀ █  █  ▄█▄▀▄ ▀▄▄ █▄▄█ █▀▀▀▀▀█
█ ███ █   ▄█▀▀▀▄▄▀█ ▀██▄ █ █ █▀█ ▀▄ ▀▄ █▀ █ ███ █
█ ▀▀▀ █ ▄ █▄▄█  █ █ ███▀▀▀██▄▀▄▄█▀▄▀▄▄▄   █ ▀▀▀ █
▀▀▀▀▀▀▀ █▄█▄█▄█ █▄█ ▀▄█ ▀ █ █▄▀▄█▄█▄▀ █Ã█ ▀▀▀▀▀▀▀
  ▄▄██▀▀ ▄  ▄▄█ ▀██§▀▄▀████  ▄█▀▄█▀▄██▄ ▀▄█▀▄  ▀ 
▄▄▀█▀ ▀▀▄  ███Ã█▀█▄  █▀▄ █ ███ ▄█▀ ▄█▄▀█▄▄▀▀▄█▄▄▄
▀▄▄ █▀▀██▄▄▄▀▄▄▄▀ ▄ ▀▀▄▄██▄ ▄ ▀▄▄   ▀ ▄ ▀███▀ ▀▀ 
▄███ █▀▀▄█▄▄█▄▀▄▄▀ █▀█▄  ▄▀ ▄▄▀▀ ▀ █▄ ▀█ ██▄▄█▄ ▄
▄▄▄ ▄ ▀█  ▄ ▄ ▀▀▄▀  ▄█ ▄▄▀███▀█▄▀▄█▀▀ ██▀██ █▀█ ▀
█  ▀█▄▀▄▄ ▀█▄ ▀ ▄▀█§▄ ▄▄█©█ ▀█▄▄▄▀█▄█▀▀█▀▀▀▀▄▄▄█▄
▀█ª██▄▀█▀▀█▄▄███▀▄▄▄▄▀▀██ █▄▄█▀█▄  █▀▀▄ ▀ ª █▄█▄▀
  ▄ █▀▀▀█▄▄██ ▀▄▀▀ ▄▄▀█▀▀▀█▀▀ ▄▄   ██▀▀ █▀▀▀███▄ 
 ▄ ▀█ ▀ █▀██▀▀  ▄ ▀██▄█ ▀ █▀▀ ▄▀██▀▀▀█▄▄█ ▀ █▄▀ ▀
▄ █ ▀▀▀███▄▄▄▀█▄▀█▄████▀▀█▀▀█▄█ ▄  █▄▀▀ ███▀█ █▀ 
█▀ █▄▄▀  █ ▄▀█▀ ▄▀███ ▄▀▀  ██ █ █▄▀▀▀ █▄ ▄▀▀▄▄██ 
▀ ▄█▄█▀█▀▄▀█▀▀ ▀▄▄▄█▄█▀█▀█ █▀██▀ ▀▄ ▄ ¨▀ ▄▄ ▀ ▄  
█▀▄▄█▀▀▀█ ███▀▀▀▀▄ █▀▀█ ▀▀ ▄▄█ ▄ ▀ ▀▀▀▄▄ ▀▄▀▄▀▀  
▀▄ ██▄▀▄ ▄ ▀▄ ▀██▀▄▄   ▄███ ▄ ▀▀██▄█▄▄▀▀ █▄  ▀█ ▄
▄█▀██▀▀▄  ▀█ █▄▄▄▄   ▀ ██ ¢  ▀▄▄█▄▀ ███ █▄▀▀▄▀██¢
 █▄▄ ▀▀█ █▄  ▀▄▄█▀▄▄██  █▄▀▄▀▀█▄█▄▄▄█ █▀▄█▄▄ █▄  
▀▀▀   ▀ ██▀██ ▄▀▄█ ▄  █▀▀▀█▀ ▀▄▄█▀ █▀▄█ █▀▀▀█ ▀▀▀
█▀▀▀▀▀█ ██▀ ▀  █▄ ▀█▄▀█ ▀ █ ▀▄█▄ ▄▀▄█ █▄█ ▀ █▀▄▀ 
█ ███ █ ▀▄▀▀▄▀ ▀ ▀█ ▀ ███▀██    ▀█ Ã▀ █ █▀██▀ ▀▄▄
█ ▀▀▀ █  █  █▄▀▄▀▄ ██▄ ██ ▀ █ ▄█▄ ▄█▄▀█ ▀ ▀  ▀▄▄ 
▀▀▀▀▀▀▀  ▀▀▀▀ §  ▀▀▀  © ▀▀▀  ▀▀ ▀   ▀▀  ▀   ▀▀▀▀▀
```
</details>

Scan each of these with your phone and you'll receive a JSON object for each QR
code:

<details>
    <summary>Spoilers:</summary>

```json
{"id":"yvct9y","user":"notused","packing_notes":"once yr pack'd,","xem":"ikhqy"}
```
</details>

The most important field is `id`. That's the ID of the order. Use it to contact
customer service:

<details>
    <summary>Spoilers:</summary>

```javascript
emucorp.members{username: "troy_cole", navigation: "cust_service", order_id: "yvct9y"}
```

You'll receive some text along with a couple of Tier 2 NPC locs. If the loc
names are corrupted, keep running the script until they become clear.
</details>

```
We cannot accept returns or refunds for this item.
This order was placed on NaN.N¤N, from a combination of the following locs: anonymous_jrttl_43tu32.info_dk34j2
xu1pyv anon_jrttl_32v32v.access_dk34j2
```

### Helpful Scripts

`dtr.qr` can be used to automatically decode a QR code.

## How to Breach an NPC

**Note:** There is a time limit on how long you can take to breach a loc. Read
all of these instructions thoroughly before you begin or you may run out of
time and have to start over.

Now that you have an NPC loc, it's time to breach it.

The first thing you'll need to do is establish a hardline. To do this, run
`kernel.hardline`; type the IP address that appears on screen. Then, run the
loc script you found earlier:

```javascript
anonym_jrttl_znx87h.public_fftgy3{}
```

You will receive a message telling you that you're being denied access by a
lock:

```
Denied access by HALPERYON SYSTEMS EZ_26 lock.
```

Access denied messages are always in the following format:

```
Denied access by <company> <lock_name> lock.
```

The amount and types of lock you'll encounter will depend on what tier of NPC
you're trying to breach.

To breach a loc, you need to provide a list of parameters to the loc for each
lock that defends it. For example, if a loc was defended by an `EZ_26` and
`EZ_NAME` lock (not real lock types):

```
anonym_jrttl_znx87h.public_fftgy3{EZ_26: "a", EZ_NAME: "steve"}
```

When a loc has multiple locks defending it, you will not be able to see the
next lock in the sequence until you've cracked all previous locks. For example,
you won't receive:

```
Denied access by HALPERYON SYSTEMS `EZ_NAME` lock.
```

until you have successfully cracked the `EZ_26` lock. When passing params to a
script, remember that all key/value pairs are case sensitive.

Once you breach all of the locks on an NPC, the NPC will "pop" and send any GC
and upgrades it stored to your system. Afterwards, it will disappear.

## How to Determine NPC Difficulty and Upgrades

NPC scripts have a specific format:

<name>_<rating><class>_<id>

**Name** 

The name will always be one of the following:
  - `abandoned`
  - `abndnd`
  - `anon`
  - `anonymous`
  - `derelict`
  - `uknown`
  - `unidentified`
  - `unknown`

  Keep in mind that it is possible for users to choose usernames designed to
  look like an NPC account.

**Rating**

The next two characters determine the rating of the NPCs system. The higher the
rating, the more locks the system has. See [_System Rating_][04] in the README
for more information. 
  - `jr`: Junkrack
  - `dd`: Diggerdeck
  - `wb`: Wreckbox
  - `pr`: Phreakrig
  - `ls`: Leetstack

**Class**

The class of an NPC is determined by what type of upgrades are loaded. See
[_System Rating - Class_][05] in the README for more information. 
  - `wvr`: Most of your upgrades are `architect` class 
  - `ttl`: Most of your upgrades are locks.
  - `wlf`: Most of your upgrades are `infiltrator` class.
  - `rvn`: Most of your upgrades are `scavenger` class.
  - `stg`: Most of your upgrades are `executive` class.

**Address**

This is the unique identifier for the loc. It's always 6 alphanumeric
characters.

**Example Loc:**

```
unknown_jrttl_yn0hlo.pubinfo_00bcts
```

This NPC has a `junkrack` rating, and is classed as a `turtle`.

## How to Determine the Difficulty of a Loc

While there's no way to determine the exact makeup of a loc's defenses, you can
get a general idea by running: 

```javascript
scripts.get_access_level{name: "<loc>"}
```

### FULLSEC

FULLSEC locs have either already been breached or are defended by only Tier 1
locks.

### MIDSEC

MIDSEC locs are defended by a `sn_w_glock` (at a minimum).

### LOWSEC/NULLSEC

NULLSEC locs are defended by locks capable of stealing your upgrades or worse.

## A List of Corporations

Here is a list of Tier 1 corporations you can get Tier 1 NPC locs from:

  <details>
    <summary>Spoilers:</summary>

  - `amal_robo.public`,
  - `aon.public`,
  - `archaic.public`,
  - `bluebun.public`,
  - `bunnybat_hut.public`,
  - `context.public`,
  - `core.public`,
  - `cyberdine.public`,
  - `empty_nest.public`,
  - `etceteraco.public`,
  - `futuretech.public`,
  - `goodfellow.public`,
  - `halperyon.public`,
  - `hyperion.public`,
  - `kill_9_1.public`,
  - `kill_bio.public`,
  - `legion_bible.public`,
  - `legion_intl.public`,
  - `light.public`,
  - `lowell_extermination.public`,
  - `marco_polo.public`,
  - `merrymoor_pharma.public`,
  - `nation_of_wales.public`,
  - `nidus.public`,
  - `nogrub.public`,
  - `nuutec.public`,
  - `pica.public`,
  - `protein_prevention.public`,
  - `ros13.public`,
  - `ros_13_update_checker.public`,
  - `setec_gas.public`,
  - `skimmerite.public`,
  - `sn_w.public`,
  - `soylentbean.public`,
  - `spy.pub_2d024f`,
  - `subject_object.public`,
  - `suborbital_airlines.public`,
  - `tandoori.public`,
  - `the_holy_checksum.public`,
  - `turing_testing.public`,
  - `tyrell.public`,
  - `vacuum_rescue.public`,
  - `weathernet.public`,
  - `welsh_measles_info.public`,
  - `weyland.public`,
  - `world_pop.public`
</details>

Here is a list of Tier 2 corporations you can get Tier 2 NPCs locs from:

  <details>
    <summary>Spoilers:</summary>

  - `bunnybat_hut`
  - `cyberdine`
  - `ellingson`
  - `setec_gas`
  - `soylentbean`
  - `suborbital_airlines`
  - `tandoori`
  - `tyrell`
  - `weyland`

  Note: Tier 2 corporation extensions rotate. If you aren't able to find a
  script with one extension, try another.

## How to Crack A Specific Lock

To learn how to hack a specific lock, see [the lock guide][06].

## How to Hack Other Players (PvP)

To hack another player:
  - Find and connect to their loc
  - Breach their defenses
  - Use PvP scripts to extract resource and information

### Finding Player Locs

#### In a Corporation

Player locs will often "leak" into loc lists returned by breached corporations.
See [_Loc Leaking_][07] for more information. Note: You will never find locs
(NPC or player) listed in a sector. Anything that looks like a loc in a sector
is likely a scam script.

#### In NPC Access Logs

When a player attempts to hack an NPC, their loc is recorded in that NPC's
access logs. Usually, this isn't an issue because most NPCs script disappear
after they're breached. However, that's not always the case (especially at
higher tiers). If you happen to find an NPC that doesn't disappear after you've
breached it, you can run:

```javascript
sys.expose_access_log{target: "<loc>"}
```

To see that access logs for that NPC and the locs of anyone who recently tried
to breach it. Note: `sys.expose_access_log` is only available to systems that
have the `expose_access_log_v<n>` upgrade loaded.

#### In Your Access Logs

Just like an NPC, _your_ system's access log contain the locs of any NPC or PC
that recently tried to breach you. To view your access logs, run:

```javascript
sys.access_log{}
```

#### By Running a Scam

You can grab the loc of anyone running a script you own. Just add:

```javascript
const loc = #ls.sys.loc();
```

To your script somewhere and `loc` will contain the loc of the player (or NPC)
running your script. From there, you can store the loc in your database for
later hacking.

Keep in mind that you can force a system to do whatever you want from a script.
So, there's really no reason to go through the trouble of stealing and storing
someone's loc via a script just so you can hack _back_ into their system later
to steal their GC and upgrades. You're better off just forcing their system to
give you everything you want for free. Also, stealing via a script means _your_
loc won't be exposed to your victim. At most, they'll only see your username in
the transfer logs of their system.

### Breaching Player Defenses

Generally speaking, players have the same primary defenses as their NPC
counterparts: locks. Breaching a player system means bypassing the same types of
locks you'll find on any NPC system. However, unlike NPCs, players can actively
attempt to defend their system during a breach attempt.

### Extracting Resources

Unlike NPCs, player locs don't automatically surrender their GC and upgrades
when breached. In order to extract resources from a PC system, you'll need to
use `scavenger` class upgrades like `sys.transfer_balance_v1` or
`sys.xfer_upgrade_from`.

[01]: https://hackmud.fandom.com/wiki/GC
[02]: https://hackmud.fandom.com/wiki/Security_Levels
[03]: https://hackmud.fandom.com/wiki/Loc
[04]: ./README.md#system-rating
[05]: ./README.md#class
[06]: ./LOCKS.md#class
[07]: ./README.md#loc-leaking
