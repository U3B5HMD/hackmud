---
title: Locs
parent: Gameplay
---

# Locs

Locs are the "address" of an initialized system. With this address, you can
break into a system (player or NPC). To see your own loc (after you've
initialized your system), run:

```javascript
 sys.loc
```

## Exposing your Loc Via Hacks

Every time you attempt to hack a player loc (PVP) or certain NPC locs (PVE), the
loc of the account you used to make the hack gets written to the access logs of
the defending system. The owner of the defending system will know you attempted
to breach them and will be able to attack your system using your loc.

There is no current way of hiding your loc during a hacking attempt.

## Exposing Your Locs Via Scam Scripts

If you run a script that has a sec level of `LOWSEC` or lower, that script can
access your loc via `sys.loc`. From there, it could log your loc to the script
owner's database or even force your account to shout it out in the `0000`
channel.

## Loc Leaking

Even if you never hack anyone and don't run shady scripts, there's a chance your
loc will leak out to the public via an NPC corp. When an NPC corp is hacked, it
releases a list of locs. _Most_ of the locs it releases are going to be NPC locs
that a player can then hack for GC. But there's also a small chance that one or
more player locs will get included in that list (including yours).

## Loc Rotation

Every time a loc undergoes a rotation (noted in the user's `sys.access_log` as
"Lock rotation. Breach state reset"), every loaded lock's solution will "rotate"
to a new value. For example, a loaded EZ_21 lock that accepts "unlock" as its
solution may require "open" on the next rotation.

The time it takes a loc to rotate can vary significantly. It is based on
activity as well as how often the user is being attacked. A user currently under
attack will rotate in 16-18 minute cycles, an active but not under-attack user
will usually rotate every hour and inactive users will rotate progressively
slower the longer they stay inactive until lock rotations stop entirely. If
activity resumes or the user is attacked, rotations will resume. If a user's
system is breached, rotations will be paused until the breach state is reset.
This takes a minimum of 2 minutes.