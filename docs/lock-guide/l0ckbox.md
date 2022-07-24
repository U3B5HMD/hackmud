---
title: l0ckbox
parent: Lock Guide
---

# l0ckbox

Unlike most locks, the `l0ckbox` lock doesn't ask what you _know_, it asks what
you _have_:

```
To continue, please load the appropriate k3y: xwz7ja
```

## How to Crack

To crack a `l0ckbox` lock, you must have the correct `k3y` upgrade loaded on
your system. See [_Loading/Unloading
Upgrades_](/gameplay/upgrades#loadingunloading-upgrades) for more info on
managing upgrades. 

If you think you might already have the upgrade stored, you can check with the
following command:

```javascript
sys.upgrades{filter: {name: "k3y_v1", loaded: false}, full: true}
```

This will list every Tier 1 `k3y` upgrade stored on your system that isn't
currently loaded:

![](../../assets/images/unloaded-k3ys.png)

If you see an upgrade with the correct `k3y`, load it via `sys.manage` and call
the loc again. It should bypass the `l0ckbox` lock completely.

## Notes

Don't be fooled by the simplicity of the lock's design. Tier 1 `k3y` upgrades
may be easy to come by in the early game but finding one with the correct `k3y`
values at higher tiers becomes increasingly difficult and rare. Combine that
with the fact that `k3y` upgrades take up space while not directly benefiting
your system the `l0ckbox` lock becomes increasingly difficult to plan for during
a run.