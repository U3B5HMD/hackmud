---
title: Upgrades
parent: Gameplay
---

# Upgrades

Upgrades are software that you install on your system. An upgrade does one of
the following:
  - Defend your system against intrusion (lock)
  - Increase storage space (script character count, script slots, etc.,)
  - Allow you to attack other players
  - Display trophies you've won during events

Upgrades fall into one of the following categories:

- Locks: Used to defend your system.
- Architect: Used for writing and publishing scripts.
- Infiltrator: Used for stealing information from a target.
- Scavenger: Used to stealing upgrades from a target.
- Executive: Used for managing how many chat channels you can join.

## View Upgrades

To view upgrades currently saved on your system, run `sys.upgrades`:

![](../../assets/images/sys.upgrades.png)

Indexes that are in cyan are upgrades that are loaded. To learn more about an
upgrade, run: 

```
sys.upgrades{i: <index>, full: true}
```

## Loading/Unloading Upgrades

In order for an upgrade to work on your system, it needs to be loaded. To load
an upgrade:

```javascript
sys.manage{load: <index or array>}
```

For example, to load upgrade 13:

```javascript
sys.manage{load: 13}
```

You can unload an upgrade the same way:

```javascript
sys.manage{unload: 13}
```

## Reordering Upgrades

The order that locks are listed and loaded in your system is the order that
intruders will have to break them in. To reorder upgrades:

```javascript
sys.manage{reorder: [{from: 10, to: 2}]}
```

In this example, we're moving `char_count_v1` from index 10 to index 2.

## Deleting Upgrades

To delete one or more upgrades:

```javascript
sys.cull{i: <index or array>, confirm: true}
```

You cannot delete loaded upgrades.

## Upgrade Rarity

An upgrade can have one of the following rarity levels:

| Rank | Description | Color  |
| :--- | :---------- | :----- |
| 0    | noob        | Grey   |
| 1    | kiddie      | white  |
| 2    | h4x0r       | Green  |
| 3    | h4rdc0r3    | Blue   |
| 4    | \|_\|b3\|2  | Purple |
| 5    | 31337       | Orange |

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