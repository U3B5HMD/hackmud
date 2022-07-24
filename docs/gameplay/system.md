---
title: System
parent: Gameplay
---

# Understanding Your System

Run `sys.specs` to get an overview of your system.

![](../../assets/images/sys.specs.png)

## Class

Your "class" is based on what type of upgrades you have loaded and how many.

| Class  | Requirements                                   |
| :----- | :--------------------------------------------- |
| weaver | Most of your upgrades are `architect` class.   |
| turtle | Most of your upgrades are locks.               |
| wolf   | Most of your upgrades are `infiltrator` class. |
| raven  | Most of your upgrades are `scavenger` class.   |
| stag   | Most of your upgrades are `executive` class.   |

Broadly speaking, your class doesn't affect gameplay. However, there are certain
locks that will behave differently based on what class you are.

## Tier

What system your tier has been initialized at. Your system's tier determines how
much money you can have, how many upgrades you can store and load, the cost of
playing BINMAT, and what PVP scripts you are vulnerable to. Each tier is
vulnerable to a specific set of PVP scripts _plus_ all vulnerabilities listed
under the previous tiers.

### Tier 0 (Uninitialized)

Tier 0 is where your system starts when you first leave the VLAN. Uninitialized
systems can't use upgrades, call player locs, or run BINMAT. Uninitialized
systems have a GC cap of 5 million.

Uninitalized systems cannot be harmed even when breached. A lot of veteran users
keep an uninitialized system as an alt so they can safely test untrusted
scripts.

### Tier 1

Initializing to Tier 1 allows the user to obtain upgrades, can hold a maximum of
32 upgrades at a time, can load a maximum of 8 upgrades at a time, and can only
hold Tier 1 upgrades. Tier 1 systems can hold a maximum of 20MGC. The BINMAT fee
for Tier 1 users is 8MGC.

Tier 1 systems are assigned a loc, which cannot be changed once it has been
assigned. When a Tier 1 system is breached, they are vulnerable to the PvP
scripts `sys.expose_access_log` and `sys.write_log`.

Initializing to tier 1 costs 1MGC. 

### Tier 2

Initializing to Tier 2 allows the user to hold a maximum of 64 upgrades at a
time, load a maximum of 16 upgrades at a time, and can hold Tier 2 upgrades.
Tier 2 systems can hold a maximum of 5BGC. The BINMAT fee for Tier 2 users is
512MGC.

Tier 2 systems, in addition to the previous tier of vulnerabilities, become
vulnerable to the PvP scripts `sys.expose_balance`, `sys.expose_transactions`,
`sys.expose_upgrades`, `sys.expose_upgrade_log`, and `sys.xfer_gc_from`. This
means that GC can be stolen from users that are Tier 2 or higher.

Initializing to Tier 2 costs 10MGC. 

### Tier 3

Initializing to Tier 3 allows the user to hold a maximum of 128 upgrades at a
time, load a maximum of 32 upgrades at a time, and can hold Tier 3 upgrades.
Tier 3 systems can hold a maximum of 5TGC. The BINMAT fee for Tier 3 users is
8BGC.

Tier 3 systems, in addition to the previous tier of vulnerabilities, become
vulnerable to the PvP script `sys.xfer_upgrade_from`. This means that unloaded
upgrades can be stolen from users that are Tier 3 or higher.

Initializing to Tier 3 costs 100MGC.

### Tier 4

Tier 4 is the final tier available to users. A tier 4 system can hold 256
upgrades at a time, can load 64 upgrades at a time and can hold every tier of
upgrade. Tier 4 systems have no limit to the amount of GC they can hold, as the
maximum is equal to the theoretical maximum amount of GC in the game. The BINMAT
fee for tier 4 users is 32BGC.

Currently, there are no additional PvP script vulnerabilities inherent in tier 4
users, however initializing to tier 4 means that the player has agreed to be
introduced to any risks the tier may introduce in the future. 

Initializing to tier 4 costs 1BGC.

## System Rating

The rating of your system is based on how many locks you have loaded and their
quality. Lock quality is calculated as `2^(lockTier)+LockRarity` So a grey
`EZ_40` lock (tier1, 0 rarity) is worth 2 points towards your system rating.

| Name       | Abbreviation | Point Range |
| :--------- | :----------- | :---------- |
| Junkrack   | jr           | 0-17        |
| Diggerdeck | dd           | 18-29       |
| Wreckbox   | wb           | 30-42       |
| Phreakrig  | pr           | 43-69       |
| Leetstack  | ls           | 70+         |

Your system's rating does not directly impact gameplay.

## Hardline Count / Next Hardline

In order to breach a loc, you first have to connect it via `kernel.hardline`.
The amount of times you can run `kernel.hardline` in a given 12 hour period is
based on your system's tier.

| Tier | Max Hardline Count |
| :--- | :----------------- |
| 0    | 256                |
| 1    | 32                 |
| 2    | 24                 |
| 3    | 18                 |
| 4    | 12                 |

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

## Channel Count

`channel_count` is how many in-game chat channels you can be in simultaneously.
This number really only comes into play when searching sectors for scripts.

## GC Max

`gc_max` is how much GC your system can hold at a given time based on your 
system's tier.

## Upgrade Space

This section shows how many total upgrades you have out of the max possible and
how many upgrades you have loaded out of the max possible.

## Script Space

This section shows information about how many scripts you have and how many
characters a script is allowed to have.

### Publics

How many uploaded scripts you are allowed to mark as public (default is 0).

### Scripts

How many scripts total you are allowed to upload (default is 1).

### Chars

The max number of characters allowed in a single script (default is 500).

## Tier Stats

| Tier | Cost | Max GC | Max Stored Upgrades | Max Loaded Upgrades | Max Hardlines |
| :--: | :--- | :----- | :------------------ | ------------------- | :------------ |
|  0   | N/A  | 5M     | 0                   | 0                   | 256           |
|  1   | 1M   | 20M    | 32                  | 8                   | 32            |
|  2   | 10M  | 5BGC   | 64                  | 16                  | 24            |
|  3   | 100M | 5TGC   | 128                 | 32                  | 18            |
|  4   | 1B   | N/A    | 256                 | 64                  | 4             |

