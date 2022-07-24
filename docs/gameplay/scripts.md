---
title: Scripts
parent: Gameplay
---

# Scripts

Scripts are how players interact with the Hackmud environment. Nearly everything
you will interact with as a player (e.g., locks, upgrades, corps) either comes
from or is a script.

## Script Levels

Every script has a security level. You can learn the security level of a given
script by running `scripts.get_level{name: "<script>"}`.

### FULLSEC

FULLSEC is the safest security level. By default, all scripts start off as
FULLSEC scripts, provided that no dependencies of a lower sec level are called.

### HIGHSEC

HIGHSEC scripts are able to call scripts such as `accts.balance`,
`accts.transactions`, `sys.upgrades`, and `sys.upgrade_log`. 

### MIDSEC

Scripts are MIDSEC are capable of transferring GC out of your user's accts
balance with` accts.xfer_gc_to`, can retrieve a list of every chat channel you
are in with `chats.channels` (as well as join and leave them with `chats.join`
and `chats.leave`) and can manage upgrades with `sys.manage`. 

### LOWSEC

LOWSEC scripts can transfer, sell and destroy upgrades using
`sys.xfer_upgrade_to`,` market.sell` and `sys.cull` respectively. They can also
call `sys.loc`, revealing your loc to the script.

### NULLSEC

NULLSEC is the least safe security level. At NULLSEC, corporation-related
activities can be managed with the `corps.*` scripts, `binmat.*` scripts can
play BINMAT sessions automatically, your `users.inspect` profile can be modified
with `users.config` and `sys.breach` can immediately breach one's system,
bypassing all locks and BINMAT.

## Avoiding Scams

Before you run _any_ script you find, always pass it to `scripts.get_level` to
see if it is safe.


## Helpful Scripts

These are scripts that might be helpful to you as you poke around the network.
  - `lore.data_check`
  - `teach.me`
  - `teach_si_x80d.each_other`