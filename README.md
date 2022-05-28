# Hackmud 

## Table of Contents
- [About this Repository](#about-this-repository)
  * [A Word of Caution](#a-word-of-caution)
  * [Avoiding Spoilers](#avoiding-spoilers)
  * [Fixing Errors](#fixing-errors)
  * [Contributing to the Repository](#contributing-to-the-repository)
- [Repository Requirements](#repository-requirements)
- [How to Set Up the Development Environment](#how-to-set-up-the-development-environment)
- [What is Hackmud?](#what-is-hackmud)
  * [The Nature of the Game](#the-nature-of-the-game)
  * [The Best Way to Play](#the-best-way-to-play)
- [Configuring the UI](#configuring-the-ui)
  * [Configure Chat Message Display](#configure-chat-message-display)
  * [Mute Messages from Users](#mute-messages-from-users)
  * [Change the Size of the UI](#change-the-size-of-the-ui)
  * [Change The Levels of Visual Effects](#change-the-levels-of-visual-effects)
  * [Change the Volume of Sound Effects and Background Music](#change-the-volume-of-sound-effects-and-background-music)
- [Getting Started - Prove your Sentience](#getting-started---prove-your-sentience)
- [Life after VLan](#life-after-vlan)
  * [Upgrades](#upgrades)
    + [View Upgrades](#view-upgrades)
    + [Loading/Unloading Upgrades](#loadingunloading-upgrades)
    + [Reordering Upgrades](#reordering-upgrades)
    + [Deleting Upgrades](#deleting-upgrades)
    + [Upgrade Rarity](#upgrade-rarity)
  * [Scripts](#scripts)
      - [Script Levels](#script-levels)
      - [FULLSEC](#fullsec)
      - [HIGHSEC](#highsec)
      - [MIDSEC](#midsec)
      - [LOWSEC](#lowsec)
      - [NULLSEC](#nullsec)
  * [The Market](#the-market)
    + [Browsing](#browsing)
      - [By Tier](#by-tier)
      - [By Seller](#by-seller)
      - [By Date Posted](#by-date-posted)
      - [By Rarity](#by-rarity)
      - [By Cost](#by-cost)
      - [By Type](#by-type)
      - [By Name](#by-name)
      - [By Class](#by-class)
      - [By Field Value](#by-field-value)
      - [View Item Details](#view-item-details)
    + [Buying](#buying)
    + [Selling](#selling)
      - [Selling Multiple Items at Once](#selling-multiple-items-at-once)
    + [Removing an Item For Sale](#removing-an-item-for-sale)
    + [Cold Storage](#cold-storage)
  * [Locs (NPCs and Players)](#locs-npcs-and-players)
      - [Exposing your Loc Via Hacks](#exposing-your-loc-via-hacks)
      - [Exposing Your Locs Via Scam Scripts](#exposing-your-locs-via-scam-scripts)
      - [Loc Leaking](#loc-leaking)  
  * [Avoiding Scams](#avoiding-scams)
- [Writing Your First Script](#writing-your-first-script)
- [Hacking NPCs](#hacking-npcs)
- [Understanding Your System](#understanding-your-system)
  * [Class](#class)
  * [Tier](#tier)
    + [Tier 0 (Uninitialized)](#tier-0--uninitialized-)
    + [Tier 1](#tier-1)
    + [Tier 2](#tier-2)
    + [Tier 3](#tier-3)
    + [Tier 4](#tier-4)
  * [System Rating](#system-rating)
  * [Hardline Count / Next Hardline](#hardline-count--next-hardline)
  * [Channel Count](#channel-count)
  * [GC Max](#gc-max)
  * [Upgrade Space](#upgrade-space)
  * [Script Space](#script-space)
- [Asking for Help](#asking-for-help)
- [Helpful Scripts](#helpful-scripts)

## About this Repository

This repository will guide you through how to play Hackmud as well as provide
premade scripts that you can use to gather resources and explore. It is meant to
be as comprehensive as possible and provide direct, clear answers to players'
questions about the game and how to play it, even if that means spoiling the
"mystery".

The information in this repo is limited to what its author(s) know about Hackmud
either through direct experience or via the player community. The goal of this
repository is to collect all of the various tips, tricks, and spoilers about the
game and aggregate them into a single place. If you have information you want to
contribute, see "Contributing to the Repository".

### A Word of Caution

As the login prompt at the start of Hackmud states, "larceny, laundering, theft
of currency and information, deception, betrayal, and backstabbing" are all part
of Hackmud. They could very well be part of this repo.

### Avoiding Spoilers

This README file does its best to avoid spoilers for the game. Any document in
this repository that does contain spoilers will contain a warning. If you want
to avoid unintentional spoilers, read only the information contained within this
README and avoid anything else in the repo (including scripts).

### Fixing Errors

If you find an error (incorrect information or typos), please open an
[issue][08].

### Contributing to the Repository

If you have a feature you would like to add or information you want to share,
please submit a merge request or open an [issue][08].

If you want to show in-game support for this project, you can send gifts of
upgrades or GC to `opnsrce`.

## Repository Requirements

In order to use this repo, you'll need to have the following on your system:
  - Node 16.13.1 or greater
  - The ability to run linux commands like `ln` on your system.

This repo was has been developed on a unix-based operating system and may not
be fully compatible with windows. If you do run into issues on windows, please
open an [issue][08].

## How to Set Up the Development Environment

From the command line, run:

```
npm run start
```

Then, follow the prompts.

## What is Hackmud?

From the [website][01]:

> hackmud is a cyberpunk themed text-based hacking simulator for
> intel-compatible personal home computers. Get lost in a deep and complex world
> full of challenging puzzles. Make friends and enemies as you explore the
> depths of abandoned future internet cyber-structure. Navigate the strange
> trials laid out for you by the Multi-User Domain’s governing
> cyber-super-intelligence, 'The Trust' 'Patch into the hardline' to access
> protected systems and steal their digital goods Prove your worth to The Trust
> and escape the virtual L.A.N. Create and destroy digital empires while
> exploring the user-created multiplayer world.

### The Nature of the Game

Hackmud, like the name suggests, is a [MUD][04] - a text based, multi-user game
where players explore a virtual world using a "terminal" provided by the
software. Think of it like World of Warcraft but without any pictures.

Unlike a lot of MMOs, Hackmud doesn't have a single-player story to help drive
or guide the user through the game. Once you leave the tutorial (VLAN), you're
really on your own. For some people, this lack of direction offers a lot of
personal freedom - they get to define what kind of game they want to play and
how to play it. For other folks, the lack of structure makes makes Hackmud feel
like nothing more than a sandbox game for programmers.

When I booted up Hackmud, I felt very much a part of the second group. Outside
of the VLAN, Hackmud felt very much like the early days of Minecraft - sure, it
was fun to punch trees and build a house, but once you've mastered the basics,
it doesn't feel like there's much else to do.

This is why it's important to think of Hackmud not as a game, but as a giant
puzzle box. Hackmud lacks guide posts _by design_. As a player, you're meant to
_try stuff_. Find a [lock][05] you've never seen before? Start passing in random
parameters to break it. Discover a random script in a [sector][06]? Run it and
see what happens.

A lot of "official" information you'll find on the Hackmud environment is
actually cobbled together notes from various players doing trial-and-error on
something they found. No one _actually_ knows what they're doing.

If solving puzzles without a picture on the box sounds like a good time to you,
then give Hackmud a try. If not, (but you still love the hacker aesthetic) I
recommend you check out [Hacknet][07] instead.

### The Best Way to Play

The purest way to play Hackmud is through random exploration and risk taking,
never asking for help outside the game and never searching for answers online.

The **best** way to play Hackmud is whatever way is the most fun for you as a
player. 

Poke around for hours, never asking for help. 

Jump into the discord and ask veteran players for tips.

Read every spoiler in this repo. Steal every script I've written and use it
to mine every NPC corp you can find.

Do whatever makes you happy and lets you enjoy the game you paid for the most.
Don't let anyone tell you you're playing a game with no structure or goals
"the wrong way".

## Configuring the UI

### Configure Chat Message Display

**Usage:**

```
gui.chats{shell: <boolean>, chat: <boolean>}
```

By default, chat messages are sent to the shell (the main part of the screen)
and the chat window. This makes it easy to see new messages when they come in
but it also means that chat messages will interrupt any text on the screen while
you're working on something.

To turn off chat messages in the shell, set `shell` to `false`. To turn off
chat messages in the chat window, set `chat` to `false`.

### Mute Messages from Users

**Usage:**

```
gui.quiet{add: <username>, remove: <username>, list: <boolean>, clear: <boolean>}
```

Use this script if you want to grey-out chat messages from specific users. It
doesn't actually remove them from the chat window, unfortunately. It's also
quite buggy. If the user you've "quieted" puts newlines in their message, every
line after the first newline comes through normally (not grayed out). If you
want to hang out in `0000` but want to reduce the bot noise, add these names to
your quiet list with:

```javascript
gui.quiet{add: "<username>"}
```
<details> 
    <summary>List of Bots:</summary>
    
  - `adventure`
  - `advertise`
  - `blank`
  - `cal_initiative`
  - `discord`
  - `eliza`
  - `epoch_news`
  - `extra`
  - `fran_lee`
  - `hey_there_stranger`
  - `hint`
  - `hoborg`
  - `iguana`
  - `link_light_rail_train_7`
  - `lock`
  - `lore`
  - `matr3x`
  - `navi`
  - `on_th3_1ntern3ts`
  - `packbot_7257`
  - `pompeii`
  - `promo`
  - `robovac_11_134_2_221`
  - `robovac_19_51_0_26`
  - `robovac_idp1p1`
  - `spy`
  - `suborbital_committee`
  - `sudo`
  - `the_digger_king`
  - `tk`
  - `trust`
  - `twitter`
  - `unbindall`
  - `weather_network_us`
  - `willie`
  - `xena`
  - `zez_facts`
</details>

**add:** Adds the passed in username to the quiet list.
**remove:** Adds the passed in username from the quiet list.
**list:** If true, lists all users on the quiet list
**clear** Removes all users from the quiet list.

### Change the Size of the UI

**Usage:**

```
gui.size(i: <-20 to 20>)
```

Use this script to make your UI larger or smaller. 20 is really big and -20 is
so small it's almost invisible.

### Change The Levels of Visual Effects

**Usage:**

```
gui.vfx{ bloom:<0-11>, noise:<0-11>, scan:<0-11>, bend:<0-11>}
```

Use this script to change the level of text bloom, visual noise, scanlines, and
animations.

### Change the Volume of Sound Effects and Background Music

**Usage:**

```
gui.vol {sfx:<0-11>, bgm:<0-11>}
```

Use this script to change the volume of the sound effects and background music.

### Reset Autocompletes

To reset the scripts included in your autocomplete list:

```
autos.reset
```

This will remove any scripts from your autocompletes (including those listend in
`trust`). After running this command, run `scripts.trust` to restore the trust
scripts to your autocompletes.

## Getting Started - Prove your Sentience

The best thing you can do for yourself is to work through the (multi-hour long)
tutorial. Yes, it's a lot to take in, but I promise you'll be glad you did once
you make it out of of the VLAN.

## Life after VLan

Once you've escaped the VLAN and made your way to the main game, the first thing
you should do is run the tutorial script `teach_si_x80d.each_other`. This will
guide you through the basics of how to find and break into systems, collect GC
(the in-game currency), and eventually initialize your system.

### Upgrades

Upgrades are software that you install on your system. An upgrade does one of
the following:
  - Defend your system against intrusion (lock)
  - Increase storage space (script character count, script slots, etc.,)
  - Allow you to attack other players
  - Display trophies you've won during events (see: [Glam][02])

Upgrades fall into one of the following categories:

- Locks: Used to defend your system.
- Architect: Used for writing and publishing scripts.
- Infiltrator: Used for stealing information from a target.
- Scavenger: Used to stealing upgrades from a target.
- Executive: Used for managing how many chat channels you can join.

#### View Upgrades

To view upgrades currently saved on your system, run `sys.upgrades`:

<pre>
full:true for upgrade details
i:<index or array> to pre-filter on index(es)

000 tier_1 lock         DATA_CHECK_V1
001 tier_1 lock         l0cket
002 tier_1 lock         ez_40
003 tier_1 lock         c003
004 tier_1 script_space char_count_v1
005 tier_1 script_space char_count_v1
006 tier_1 script       expose_access_log_v1
007 tier_1 script_space script_slot_v1
008 tier_1 script_space char_count_v1
009 tier_1 script_space script_slot_v1
010 tier_1 script_space char_count_v1
011 tier_1 script_space char_count_v1
012 tier_1 script_space script_slot_v1
013 tier_1 script       w4rn_message
014 tier_1 lock         ez_21
015 tier_1 tool         k3y_v1
016 tier_1 script       log_writer_v1
017 tier_1 script_space public_script_v1
</pre>

Indexes that are in cyan are upgrades that
are loaded. To learn more about an upgrade, run: 

```
sys.upgrades{i: <index>, full: true}
```

#### Loading/Unloading Upgrades

In order for an upgrade to work on your system, it needs to be loaded. To load
an upgrade:

```
sys.manage{load: <index or array>}
```

For example, to load upgrade 13:

```
sys.manage{load: 13}
```

You can unload an upgrade the same way:

```
sys.manage{unload: 13}
```

#### Reordering Upgrades

The order that locks are listed and loaded in your system is the order that
intruders will have to break them in. To reorder upgrades:

```
sys.manage{reorder: [{from: 10, to: 2}]}
```

In this example, we're moving `char_count_v1` from index 10 to index 2.

#### Deleting Upgrades

To delete one or more upgrades:

```
sys.cull{i: <index or array>, confirm: true}
```

You cannot delete loaded upgrades.

#### Upgrade Rarity

An upgrade can have one of the following rarity levels:

<pre>
0 noob (grey)
1 kiddie (white)
2 h4x0r (green)
3 h4rdc0r3 (blue)
4 |_|b3|2 (purple)
5 31337 (orange)
</pre>

All upgrades have a rarity level. The higher the rarity level, the better the
upgrade. For example, a `char_count_v1` upgrade that's got a rarity of `h4x0r`
is going to have a greater character count than the same upgrade with a rarity
of `noob`.

grey and white (`noob`, `kiddie`) upgrades have fixed stats - they'll always be
the same/ For example, a grey `char_count_v1` will always add 500 characters to
your total character count.

Upgrades that are green (`h4x0r`) and  above have randomized stats that differ
per upgrade, per tier. So, make sure you examine your upgrades by running:

```javascript
sys.upgrades:{i: <index>, full: true}
```

Before deciding what to cull or sell.

### Scripts

Scripts are how players interact with the Hackmud environment. Nearly everything
you will interact with as a player (e.g., locks, upgrades, corps) either comes
from or is a script.

##### Script Levels

Every script has a security level. You can learn the security level of a given
script by running `scripts.get_level{name: "<script>"}`.

##### FULLSEC

FULLSEC is the safest security level. By default, all scripts start off as
FULLSEC scripts, provided that no dependencies of a lower sec level are called.

##### HIGHSEC

HIGHSEC scripts are able to call scripts such as `accts.balance`,
`accts.transactions`, `sys.upgrades`, and `sys.upgrade_log`. 

##### MIDSEC

Scripts are MIDSEC are capable of transferring GC out of your user's accts
balance with` accts.xfer_gc_to`, can retrieve a list of every chat channel you
are in with chats.channels (as well as join and leave them with `chats.join` and
`chats.leave`) and can manage upgrades with `sys.manage`. 

##### LOWSEC

LOWSEC scripts can transfer, sell and destroy upgrades using
`sys.xfer_upgrade_to`,` market.sell` and `sys.cull` respectively. They can also
call `sys.loc`, revealing your loc to the script.

##### NULLSEC

NULLSEC is the least safe security level. At NULLSEC, corporation-related
activities can be managed with the `corps.*` scripts, `binmat.*` scripts can
play BINMAT sessions automatically, your `users.inspect` profile can be modified
with `users.config` and `sys.breach` can immediately breach one's system,
bypassing all locks and BINMAT. 

### The Market

The market is where users can buy and sell upgrades (including locks) for GC.

#### Browsing

You can browse the market with:

```javascript
market.browse{}
```

And one or more of the following options: 

##### By Tier

`tier` filters the results to only show upgrades at the passed in tier (1-4):

```javascript
market.browse{tier: 1}
```

##### By Seller

`seller` filters the results to only show upgrades sold by a particular user:

```javascript
market.browse{seller: "opnsrce"}
```

##### By Date Posted

`listed_before` filters the results to only show upgrades listed no later than
the passed in timestamp:

```javascript
market.browse{listed_before:1490286018.35423}
```

`listed_after` filters the results to only show upgrades listed no earler than
the passed in timestamp:

```javascript
market.browse{listed_after:1490286008.35423}
```

##### By Rarity

`rarity` filters the results to only show upgrades at the passed in
[rarity][14]:

```javascript
market.browse{rarity: 1}
```

##### By Cost

`cost` filters the results to only show upgrades that cost the passed in amount:

```javascript
market.browse{cost: "1000GC"}
```

##### By Type

`type` filters the results to only show upgrades of the passed in type: `lock`,
`script_space`, `script`, `tool`:

```javascript
market.browse{type: "script"}
```

##### By Name

`name` filters the results to only show upgrades with the passed in name:

```javascript
market.browse{name: "char_count_v1"}
```

##### By Class

`class` filters the results to only show upgrades that belong to the passed in
class: `architect` `executive`, `infiltrator`, `scavenger`.

```javascript
market.browse{class: "scavenger"}
```

##### By Field Value

You can also filter by an field that exists on an item being sold. For example,
if you wanted to filter by items that have a `chars` field with a value greater
than or equal to 200:

```javascript
market.browse{chars:{"$gte": 2000}}
```

For more information about what comparison operators are available, see the
[mongoDB documentation][13].

##### View Item Details

To view more details about an item, use its token:

```bash
u5atpi 1KGC     w4rn_message
```

```javascript
market.browse{i:"u5atpi"}
```

#### Buying

Buying an item from the market is as easy as providing the item's token:

```bash
u5atpi 1KGC     w4rn_message
```

```javascript
market.buy{i:"u5atpi"}
```

#### Selling

To sell an item on the market, use its index listed in `sys.upgrades`:

```
001 tier_1 script_space public_script_v1
002 tier_1 script_space script_slot_v1
003 tier_1 bot_brain    cron_bot_v1
004 tier_1 script_space public_script_v1
005 tier_1 script_space public_script_v1
006 tier_1 script_space public_script_v1
007 tier_1 script_space public_script_v1
```

```javascript
market.sell{i: 1, cost: "1KGC", confirm: true}
```

Additionally, you can specificy a description and whether or not you want to
be notified if the item sells (defaults to `true`):

```javascript
market.sell{i: 1, cost: "1KGC", description: "my fave upgrade", no_notify: false, confirm: true}
```

Putting an item up for sale costs 1000 GC or 5 percent of the asking price
(whichever is larger).

##### Selling Multiple Items at Once

If you have multiple items of the same tier and rarity you want to sell, you can
specify a count:

```javascript
market.sell{i: 1, cost: "1KGC", count: 4, confirm: true}
```

This will list all 4 `public_script_v1` scripts on the marketplace for 1KGC.

You can only sell multiples of an upgrade if the upgrades have the same tier,
rarity, and stats. Becuase of this you cannot sell multiple upgrades beyond
rarity 1 (`kiddie`) because upgrades of rarity 2 or higher have unique stats
_per upgrade_.

#### Removing an Item For Sale

When you put on item up for sale, you'll be given a private `token`. This is the
unique ID for that sale that will allow you to de-list and item and return it to
your system:

```javascript
market.sell{delist: "abcdefg"}
```

#### Cold Storage

If you have one or more upgrades that you want to keep available but don't want
them to take up space in your inventory, you can list it for sale on the
marketplace and set the price to a value that no other players will see as a
good deal. When you need the upgrade, simply de-list it using the upgrade's sale
token.

### Locs (NPCs and Players)

[Locs][03] (short for location, pronounced "lokes") are the "address" of an
initialized system. With this address, you can break into a system (player or
NPC). To see your own loc (after you've initialized your system), run `sys.loc`.

#### Exposing your Loc Via Hacks

Every time you attempt to hack a player loc (PVP) or certain NPC locs (PVE), the
loc of the account you used to make the hack gets written to the access logs of
the defending system. The owner of the defending system will know you attempted
to breach them and will be able to attack your system using your loc.

There is no current way of hiding your loc during a hacking attempt.

#### Exposing Your Locs Via Scam Scripts

If you run a script that has a sec level of `LOWSEC` or lower, that script can
access your loc via `sys.loc`. From there, it could log your loc to the script
owner's database or even force your account to shout it out in the `0000`
channel.

#### Loc Leaking

Even if you never hack anyone and don't run shady scripts, there's a chance your
loc will leak out to the public via an NPC corp. When an NPC corp is hacked, it
releases a list of locs. _Most_ of the locs it releases are going to be NPC locs
that a player can then hack for GC. But there's also a small chance that one or
more player locs will get included in that list (including yours).

### Avoiding Scams

Before you run _any_ script you find, always pass it to `scripts.get_level` to
see if it is safe.

## Writing Your First Script

Greg Smith's [Hackmud Cracking Guide][09] does a far better (spoiler free) job
of explaining how scripts work and how to write one than I ever will. If you
want something geared towards JavaScript engineers (and programmers) in general,
check out my [scripting guide][10].

## Hacking NPCs

To learn how to hack NPCs, see my [hacking guide][12].

## Understanding Your System

Run `sys.specs` to get an overview of your system.

```
>>sys.specs
     // / \\_ _|/ ||\   
    || |  =█◣██◢█ || |  
    || | ((-- --- || |  

opnsrce (weaver)

tier: 2

hardline_count: 24
next_hardline: 1033s

architect(30) junkrack(14) infiltrator(4) scavenger(0) executive(0) 

channel_count: 5

gc_max: 5BGC

upgrade space
slots: 34/64
loaded: 13/16

script space
publics: 0
slots: 5
chars: 3763
```

### Class

Your "class" is based on what type of upgrades you have loaded and how many.

**weaver:** Most of your upgrades are `architect` class 

**turtle:** Most of your upgrades are locks.

**wolf:** Most of your upgrades are `infiltrator` class.

**raven:** Most of your upgrades are `scavenger` class.

**stag:** Most of your upgrades are `executive` class.

Broadly speaking, your class doesn't affect gameplay. However, there are certain
locks that will behave differently based on what class you are.

### Tier

What system your tier has been initialized at. Your system's tier determines how
much money you can have, how many upgrades you can store and load, and what PVP
scripts you are vulnerable to. Each tier is vulnerable to a specific set of PVP
scripts _plus_ all vulnerabilities listed under the previous tiers.

#### Tier 0 (Uninitialized)

Tier 0 is where your system starts when you first leave the VLAN. Uninitialized
systems can't use upgrades, call player locs, or run BINMAT. Uninitialized
systems have a GC cap of 5 million.

Uninitalized systems cannot be harmed even when breached. A lot of veteran users
keep an uninitialized system as an alt so they can safely test untrusted
scripts.

#### Tier 1

Initializing to Tier 1 allows the user to obtain upgrades, can hold a maximum of
32 upgrades at a time, can load a maximum of 8 upgrades at a time, and can only
hold Tier 1 upgrades. Tier 1 systems can hold a maximum of 20MGC. The BINMAT fee
for Tier 1 users is 8MGC.

Tier 1 systems are assigned a loc, which cannot be changed once it has been
assigned. When a Tier 1 system is breached, they are vulnerable to the PvP
scripts `sys.expose_access_log` and `sys.write_log`.

Initializing to tier 1 costs 1MGC. 

#### Tier 2

Initializing to Tier 2 allows the user to hold a maximum of 64 upgrades at a
time, load a maximum of 16 upgrades at a time, and can hold Tier 2 upgrades.
Tier 2 systems can hold a maximum of 5BGC. The BINMAT fee for Tier 2 users is
512MGC.

Tier 2 systems, in addition to the previous tier of vulnerabilities, become
vulnerable to the PvP scripts `sys.expose_balance`, `sys.expose_transactions`,
`sys.expose_upgrades`, `sys.expose_upgrade_log`, and `sys.xfer_gc_from`. This
means that GC can be stolen from users that are Tier 2 or higher.

Initializing to Tier 2 costs 10MGC. 

It costs 10 million GC to upgrade your system to Tier 2.

#### Tier 3

Initializing to Tier 3 allows the user to hold a maximum of 128 upgrades at a
time, load a maximum of 32 upgrades at a time, and can hold Tier 3 upgrades.
Tier 3 systems can hold a maximum of 5TGC. The BINMAT fee for Tier 3 users is
8BGC.

Tier 3 systems, in addition to the previous tier of vulnerabilities, become
vulnerable to the PvP script `sys.xfer_upgrade_from`. This means that unloaded
upgrades can be stolen from users that are Tier 3 or higher.

Initializing to Tier 3 costs 100MGC.

#### Tier 4

Tier 4 is the final tier available to users. A tier 4 system can hold 256
upgrades at a time, can load 64 upgrades at a time and can hold every tier of
upgrade. Tier 4 systems have no limit to the amount of GC they can hold, as the
maximum is equal to the theoretical maximum amount of GC in the game. The BINMAT
fee for tier 4 users is 32BGC.

Currently, there are no additional PvP script vulnerabilities inherent in tier 4
users, however initializing to tier 4 means that the player has agreed to be
introduced to any risks the tier may introduce in the future. 

Initializing to tier 4 costs 1BGC.

### System Rating

The rating of your system is based on how many locks you have loaded and their
quality. Lock quality is calculated as `2^(lockTier)+LockRarity` So a grey
`EZ_40` lock (tier1, 0 rarity) is worth 2 points towards your system rating.
Possible system ratings and their points ranges are:
  - Junkrack (jr): 0-17
  - Diggerdeck (dd): 18-29
  - Wreckbox (wb): 30-42 
  - Phreakrig: (pr): 43-69
  - Leetstack (ls): 70+

Your system's rating does not directly impact gameplay.

### Hardline Count / Next Hardline

In order to breach a loc, you first have to connect it via `kernel.hardline`.
The amount of times you can run `kernel.hardline` in a given 12 hour period is
based on your system's tier:
  - Tier 0: 256
  - Tier 1: 32
  - Tier 2: 24
  - Tier 3: 18
  - Tier 4: 12

Hardline caused by a BINMAT defense do not subtract from your hardline count.
Only one system can be connected to per hardline connection, but each successful
breach grants an extra connection attempt up to a maximum of three bonus
connections. So, A Tier 4 user who is successful in all of their breach
attempts, can potentially breach 48 systems using their 12 available hardlines
in a 12-hour period.

In the early days of the game, higher tier users were farming all of the
low-tier NPCs, making it nearly impossible for new users to gain GC. Limiting
hardlines forces higher tier users to engage with content at their level in
order to succeed.

`hardline_count` displays how many hardlines you have left. `next_hardline`
displays how long until you regenerate a single hardline.

### Channel Count

`channel_count` is how many in-game chat channels you can be in simultaneously.
This number really only comes into play when searching sectors for scripts (see:
[HACKING_GUIDE][12]).

### GC Max

`gc_max` is how much GC your system can hold at a given time based on your 
system's tier.

### Upgrade Space

This section shows how many total upgrades you have out of the max possible and
how many upgrades you have loaded out of the max possible.

```
upgrade space
slots: 34/64
loaded: 13/16
```

In this example, the system has 34 out of a possible 64 upgrades in storage and
has 13 out of 16 possible upgrades loaded. Loaded upgrades count towards the
total number of upgrades.

### Script Space

This section shows information about how many scripts you have and how many
characters a script is allowed to have.

**publics**: How many uploaded scripts you are allowed to mark as public 
(default is 0).
**slots**: How many scripts total you are allowed to upload 
(default is 1).
**chars** The max number of characters allowed in a single script 
(default is 500).

## Asking for Help

Hackmud has a robust and active community supporting it and they don't mind
helping new players. In game, channels like `c00lest_kats` and `town` are good
places for folks to ask questions, but they're also full of spam and bots. Your
best bet for getting questions answered is to join the [Discord Server][11].

If you have questions about this guide or scripting in general (or just want to
chat with other weavers), join `flying_shuttle`:

```javascript
chats.join{channel: "flying_shuttle"}
```

## Helpful Scripts

These are scripts that might be helpful to you as you poke around the network.
  - `dtr.man`
  - `lore.data_check`
  - `dtr.t1_lock_sim`
  - `teach.me`
  - `teach_si_x80d.each_other`

[01]: https://hackmud.com/
[02]: https://hackmud.fandom.com/wiki/Glams
[03]: https://hackmud.fandom.com/wiki/Loc
[04]: https://en.wikipedia.org/wiki/MUD
[05]: https://hackmud.fandom.com/wiki/Lock
[06]: https://hackmud.fandom.com/wiki/Sector
[07]: https://store.steampowered.com/app/365450/Hacknet/
[08]: https://github.com/opnsrce/hackmud/issues
[09]: https://observablehq.com/@smrq/hackmud-lock-cracking
[10]: ./SCRIPTING_GUIDE.md
[11]: https://discord.gg/NTgT9mnNqF
[12]: ./HACKING_GUIDE.md
[13]: https://www.mongodb.com/docs/manual/reference/operator/query-comparison/
[14]: #upgrade-rarity