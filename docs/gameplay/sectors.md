---
title: Sectors
parent: Gameplay
---

# Sectors

Sectors are basically folders that group together scripts. A script is assigned
to its sector based on it's upload date, security level, and corruption level.

## Navigating Sectors

To get a list of sectors run one of the following scripts:

  - `scripts.fullsec`
  - `scripts.highsec`
  - `scripts.midsec`
  - `scripts.lowsec`
  - `scripts.nullsec`

![](../../assets/images/sectors.png)

For example, to get a list of sectors that contain `FULLSEC` scripts:

```javascript
scripts.fullsec
```

From there, join a sector like you would join a chat channel:

```javascript
chats.join{channel: "KIN_LAMBDA_2"}
```

It is possible to be in multiple sectors at once, as long as you have the
appropriate channel space. 

Next, you'll be able to list the scripts:

```javascript
scripts.fullsec {sector: "KIN_LAMDA_2"}
```

You'll see a list of all the `FULLSEC` scripts in that sector:

![](../../assets/images/sectors2.png)

You do not need to be in a sector to run a script. If you know a public script's
name, it can be ran at any time.

## Shift Operations

When a script is made public for the first time, has its security level changed
after being made public, or is updated after falling into a grey sector
it will "shift" and move to a new sector.

While a script is being shifted, it can't be accessed. 

The shift operation mechanic prevents scam artists from rapidly switching a
script's security level after a user has checked it.

## Sector Types

Generally, sectors can be divided into two types:

### Colored Sectors

Newly-uploaded scripts and rotated NPC corp scripts will be in a colored sector
with the convention `<axiom>_<greek-letter>_<digit>`.

### Grey Sectors

If a script has not bee uploaded in the last two weeks or the script owner has
retired, it will be shifted to grey sector. If a script contains a risk
fragment, it will be shifted to a grey sector and skip the colored sectors
entirely.