---
title: l0cket
parent: Lock Guide
---

# l0cket

The `l0cket` lock requires a `k3y` to crack it. A `k3y` is a six digit
alphanumeric string. `k3ys` can be found by hacking NPCs and exploring the
[market](/gameplay/market).

## How to Crack

To crack a `l0cket` lock, you need to provide the correct `k3y`:

```javascript
abandoned_jrttl_walker.info_xk490x{l0cket: "vc2c7q"}
```

`k3ys`be obtained by finding or purchasing `k3y` upgrades. The number
after the `v` represents the tier of the upgrade. Each key contains a possible
password that can be used to unlock a `locket` lock. To view the password in a
security k3y, use `full: true` when viewing upgrades:

```javascript
sys.upgrades{i: <index of upgrade>, full: true}
```

![](../../assets/images/k3y.png)

You'll see a `k3y` field in the response. If you're having trouble finding
`k3y_v` upgrades, you can find them on the marketplace:

```javascript
market.browse{name: "k3y_v1"}
```

```javascript
market.browse{name: "k3y_v2"}
```

You don't even need to purchase them to view the passwords they contain:

```javascript
market.browse({i: <token or array of tokens>})
```

This will show you all the fields stored in the security k3y upgrade, including
any passwords.

Here are all the possible passwords for a Tier 1 `l0cket` lock:
  - `vc2c7q`
  - `cmppiq`
  - `tvfkyq`
  - `uphlaw`
  - `6hh8xw`
  - `xwz7ja`
  - `sa23uw`
  - `72umy0`

