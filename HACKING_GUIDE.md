# Hacking Guide

This is a guide for how to find NPC locs and break into them to earn [GC][01].

## Spoiler Warning

This guide is _complete_. This means that it guides you through everything you
need to know about breaching corporations and tier 1 NPCs and leaves nothing
for the player to discover for themselves.

Additionally, the end of this guide contains a substantial list of tier 1 NPCs
to let you bypass hacking a corporation completely and go straight to cracking
NPCs.

## Hacking Corporations

The easiest way to gain GC is to hack NPC corps.

### Searching Sectors for Corps

1. Get a list of [FULLSEC][02] sectors by running `scripts.fullsec`
1. Choose a sector to search
1. Join the sector by running `chats.join(channel: "<sector>")`
1. List the scripts in that sector by running `scripts.fullsec{sector: <sector>}`
1. Look for scripts ending in `.public`

#### Example Input/Output

```
scripts.fullsec

KIN_LAMBDA_2  
CHAOS_LAMBDA_2
FORM_LAMBDA_2 
VOID_LAMBDA_1 
DATA_LAMBDA_1 

chats.join{channel: "FORM_LAMBDA_2"}

scripts.fullsec{sector: "FORM_LAMBDA_2"}

crack.db
xkcd.some_comic
emucorp.public
dtr.backup
```

In this example, the corp we want to hack is at `emucorp.public`

### Searching Corps for Projects

Once you've found a corporation to hack, run the script: `emucorp.public`. 
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

This is the splash page of the corporation. Every tier 1 corporation has a
similar layout. The most important pieces of information are "latest | strategy
|". These are the commands your going to use to find the passwords and projects
needed to extract NPC locs from the corp. What we're missing right now is a
`key`.

#### Get the Key and Secret Page

Run `emucorp.public{}`. You should see something like this:

```
Please specify a command with command:"<command name>",
Public commands are "strategy" "latest",
-- access directory with command:"employees"
```

Now we know two important pieces of information:

1. The `key` we need to use is `command`.
1. The "secret" page is `employees`. 

Run `emucorp.public{command: "employees"}`:

```
No password specified
```

#### Get the Password

Looks like it's time to go find a password. Run `emucorp.public{command:
"strategy"}`:

```
User-Obsessive Design for Hypertargete© Applications-- EMU-CORP
We are calling this strategy endtheworld and we will continue to strive to deliver.
```

In this exmaple, the password is `endtheworld`. Run `emucorp.public{command:
"employees", password: "endtheworld"}`. You will see one of the following:

If the password is wrong:

```
Incorrect password.
```

If the password is missing:

```
No password specified.
```

If the password is correct:

```
Authenticated. Please specify a project to get a member list.
```

If you see "No password specified" even after providing a `password` parameter,
it means you're not using the correct parameter. Tier 1 corps can have three
possible password keys:
  - `password`
  - `pass`
  - `p`

Try each one to see what works.

#### Get a List of Projects

Next, provide a project name. To find a list of projects, run
`emucorp.public{command: "latest"}`:

```
2060AD D6
indie_jones of project dsktp_mngr has come clean about the cancellatiÃn of her product.  'We just can't justify the cost.' she said.
2060AD D18¢
Feral bunnybat¤attacks have been reported in the west garages after nightfall.  Employees are encouraged to stick to lighted areas and carry their employer-supplied mace.
2059AD D246
Protein Prevention Party is pleased to announce that the initial launch of the W3rla3NDER software is awild success.
2059AD D103
Protein Prevention Pa¨ty internal devel¡pment team has announced the release date for 101010. Protein Prevention Party declined to comment on the environmental ramifications of its production.
2057AD D317
'We've got the bad guys on the run!' -- rey_tr4cer when being asked about new developments on delete_me_first progress
```

This is a _heavily_ truncated example of a corporation blog. To find projects,
you'll need to read each entry for context clues. In this example, the project
names are `W3rla3NDER` and `delete_me_first`.

### Search the Projects for Locs

Take each project name and apply it to the corp script:

```
emucorp.public{command: "employees", password: "endtheworld", project: "delete_me_first"}
emucorp.public{command: "employees", password: "endtheworld", project: "W3rla3NDER"}
```

Each time you run these commands, you'll receive a list of NPC [locs][03] and
your system's autocompletes will be updated.

```
anonym_jrttl_znx87h.public_fftgy3
con.pubinfo_eoej39
```

### Breach the NPC

**Note:** There is a timelimit on how long you can take to breach a loc. Read
all of these instructions thoroughly before you begin or you may run out of
time and have to start over.

Now that you have an NPC loc, it's time to breach it.

The first thing you'll need to do is establish a hardline. To do this, run
`kernel.hardline`; type the IP address that appears on screen. Then, run the
loc script you found earlier:

```
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

The amount and type of lock you'll encounter will depend on what tier of NPC
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

## A List of Corporations

  Here is a list of tier 1 corporations you can get Tier 1 NPC locs from:
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

## Quickly Farm GC from Tier 1 NPCs

I'll be the first to admit that getting 1 million GC to initialize your system
is a nightmare and something that should be changed about the game. The average
tier 1 NPC releases about 50K GC when breached. That means you'll need to breach
roughly 20 NPCs just to reach tier 1. Without scripting, this is an impossible
task.

This repo contains all the tools you'll need to rapidly farm tier 1 NPCs.

### Harvest the Locs

First upload `loc_harvester` onto your system:

```
#up loc_harvester
```

It's less than 500 characters so you'll be able to use it without any upgrades.
Next, use the harvester against the list of corps in this guide:

```
loc_harvester{t: #s.<corpName>.public}
```

Make sure you include the `#s` at the front of the script name. Run this script
and it should output a bunch of locs. It may take a few attempts to get it to
work. Copy the list of locs to another window. Keep doing this with each corp in
the list. You should have a couple dozen locs by the end of it.

Since an uninitialized system only has one script slot, you'll need to delete
the loc_harvester before you can upload the tier 1 cracker:

```
#up loc_harvester delete
#up tier1_cracker
```

Append the lock cracking command to the list of NPC locs you made earler. For
example, if the first item in your list is this:

```
abndnd_m2j0yc.access_5j3sxh
```

It becomes this:

```
tier1_cracker{t: #s.abndnd_m2j0yc.access_5j3sxh}
```

Initialize a hardline:

```
kernel.hardline
```

Enter the numbers you see on the screen.

Grab the first item from your list of locs and paste it into the command line.
If all goes according to plan, you should receive the GC for the NPC loc. If the
cracker can't breach a loc, delete that loc from your list, disconnect the
hardline (`kernel.hardline{dc:true}`) and try again. You'll need to disconnect
because you can't switch to a different loc during a hardline until after you've
breached the previous one.

If your loc name has corrupted characters (looks like a little square), just
skip it and move on to the next or or attempt to guess the missing character.

When breaching multiple locs in a single run, you'll only be able to connect
to 4 locs before you have to disconnect your hardline and start again.

Once you reach 1 million GC, run `sys.init` and follow the instructions to
initialize your system to tier 1.

[01]: https://hackmud.fandom.com/wiki/GC
[02]: https://hackmud.fandom.com/wiki/Security_Levels
[03]: https://hackmud.fandom.com/wiki/Loc
