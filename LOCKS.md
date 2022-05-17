# Locks

This document contains descriptions and spoilers for every lock I've encountered
in the game.

## Table of Contents

- [Tier 1](#tier-1)
  * [EZ_21](#ez-21)
  * [EZ_35](#ez-35)
  * [EZ_40](#ez-40)
  * [C001](#c001)
  * [C002](#c002)
  * [C003](#c003)
  * [l0cket](#l0cket)
  * [DATA_CHECK](#data-check)
    + [Answers](#answers)
    + [Helpful scripts](#helpful-scripts)

## Tier 1

### EZ_21

To break an `EZ_21` lock, you need to provide one of three possible unlock
commands: `open`, `release`, or `unlock`. 

An attempt at breaking an `EZ_21` lock might look something like this:

```
abandoned_jrttl_walker.info_xk490x{EZ_21: "unlock"}
```

### EZ_35

To break an `EZ_35` lock, you need to provide one of three possible unlock
commands: `open`, `release`, or `unlock`. The lock also requires a `digit`
parameter with a value between 0 and 9 (inclusive).

An attempt at breaking an `EZ_35` lock might look something like this:

```
abandoned_jrttl_walker.info_xk490x{EZ_35: "open", digit: 5}
```

### EZ_40

 To break an `EZ_40` lock, you need to provide one of three possible unlock
commands: `open`, `release`, or `unlock`. The lock also requires an `ez_prime`
parameter with a value being a prime number between 2 and 97 (inclusive).

An attempt at breaking an `EZ_40` lock might look something like this:

```
abandoned_jrttl_walker.info_xk490x{EZ_40: "release", ez_prime: 31}
```

The complete list of possible prime numbers is: 2, 3, 5, 7, 11, 13, 17, 19, 23,
29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97.

### C001

To break a `c001` lock, you need to provide the correct color from the Hackmud
color wheel:
  - red
  - orange
  - yellow
  - lime
  - green
  - cyan
  - blue
  - purple

Please note that the order of these colors is important. The lock also requires
a `color_digit` parameter with a value equal to the number of characters in the
correct color for the lock.

An attempt at breaking an `c001` lock might look something like this:

```
abandoned_jrttl_walker.info_xk490x{c001: "red", color_digit: 3}
```

### C002

To break a `c002` lock, you need to provide the correct color from the Hackmud
color wheel:
  - red
  - orange
  - yellow
  - lime
  - green
  - cyan
  - blue
  - purple

Please note that the order of these colors is important. The lock also requires
a `c002_complement` parameter that equals the complementary color of the `c002`
lock. 

To calculate the value of `c002_complement`, use the following formula:

```javascript
(colorIndex + 4) % 8;
```

`colorIndex` is the index of the correct color for the `c002` parameter.

If `red` has an index of 0, `green` has an index of 4. `(4+4) % 8` equals `0`
which means the complementary color of `green` is `red`.

An attempt at breaking an `c002` lock might look something like this:

```javascript
abandoned_jrttl_walker.info_xk490x{c002: "green", c002_complement: "red"}
```

### C003

To break a `c003` lock, you need to provide the correct color from the Hackmud
color wheel:
  - red
  - orange
  - yellow
  - lime
  - green
  - cyan
  - blue
  - purple

Please note that the order of these colors is important. The lock also requires
a `c003_triad_1` parameter and a `c003_triad_2` parameter.
lock. 

To calculate the value of `c003_triad_1`, use the following formula.

```javascript
(colorIndex + 5) % 8;
```

To calculate the value of `c003_triad_1`, use the following formula.

```javascript
(colorIndex + 3) % 8;
```

If `red` has an index of 0, `green` has an index of 4. `(4+5) % 8` equals `1`
and `(4+3) % 8` equals `7` which means the first complementary colors of `green`
are `orange` and `purple`.

An attempt at breaking an `c002` lock might look something like this:

```javascript
abandoned_jrttl_walker.info_xk490x{c001: "green", c003_triad_1: "orange", c003_triad_2: "purple"}
```

### l0cket

To break a `l0cket` lock, you'll need a list of passwords. These passwords can
be obtained by finding or purchasing `k3y_v<number>` upgrades. The number after
the `v` represents the tier of the upgrade. Each key contains a possible
password that can be used to unlock a `locket` lock. To view the password in a
security k3y, use `full: true` when viewing upgrades:

```
sys.upgrades{i: <index of upgrade>, full: true}
```

You'll see a `k3y` field in the response. The value of that field is the
password. If you're having trouble finding `k3y_v<number>` upgrades, you can
find them on the marketplace:

```
market.browse{name: "k3y_v1"}
```

You don't even need to purchase them to view the passwords they contain:

```
market.browse({i: <token or array of tokens>})
```

This will show you all the fields stored in the security k3y upgrade, including
any passwords.

Here are all the possible passwords for a Tier 1 `l0cket` lock:
  - vc2c7q
  - cmppiq
  - tvfkyq
  - uphlaw
  - 6hh8xw
  - xwz7ja
  - sa23uw
  - 72umy0

An attempt at breaking a `l0cket` lock might look something like this:

```javascript
abandoned_jrttl_walker.info_xk490x{l0cket: "vc2c7q"}
``` 

### DATA_CHECK

The `DATA_CHECK` lock is by far the most frustrating Tier 1 lock available. To
break a `DATA_CHECK` lock, you'll need to be well versed in the [lore of
Hackmud][01]. 

When you encounter a `DATA_CHECK` lock, you'll receive the standareds "Denied
Access" message like any other lock. First, pass in an empty string:

```javascript
abandoned_jrttl_walker.info_xk490x{DATA_CHECK: ""}
```

This will trigger the lock and cause it to return the three questions it wants
you to answer:

```
did you know is a communication pattern common to user ++++++
a ++++++ is a household cleaning device with a rudimentary networked sentience
according to trust, ++++++ is more than just following directives
```

Don't be fooled by the number of `+` in each blank: they're the same length
regardless of how many characters are in the answer. When answers
to a `DATA_CHECK` lock, combine each answer into a single word. 

An attempt at breaking a `DATA_CHECK` lock might look something like this:

```javascript
abandoned_jrttl_walker.info_xk490x{DATA_CHECK: "fran_leerobovacsentience"}
``` 

#### Answers

Here are all the possible questions and answers for a Tier 1 `DATA_CHECK` lock:

**Did you know is a communication pattern common to user ++++++**

fran_lee

**A ++++++ is a household cleaning device with a rudimentary networked sentience**

robovac

**According to trust, ++++++ is more than just following directives**

sentience

**Communications issued by user ++++++ demonstrate structural patterns associated with humor**

sans_comedy

**In trust's vLAN, you became one of angie's ++++++**

angels

**In trust's vLAN, you became one of mallory's ++++++**

minions

**In trust's vLAN, you discovered that mallory and che are ++++++**

sisters

**In trust's vLAN, you encountered the will of ++++++, the prover**

petra

**In trust's vLAN, you visited faythe's ++++++**

fountain

**In trust's vLAN, you were required to hack halperyon.++++++**

helpdesk

**Pet, pest, plague and meme are accurate descriptors of the ++++++**

bunnybat

**safety depends on the use of scripts.++++++**

get_level

**Service ++++++ provides atmospheric updates via the port epoch environment**

weathernet

**This fact checking process is a function of ++++++, the monitor**

eve

**Trust's vLAN emphasized the importance of the transfer and capture of ++++++**

resource

**Trust's vLAN presented a version of angie who had lost a friend called ++++++**

bo

**User 'on_th3_1ntern3ts' has ++++++ many things**

heard

**user ++++++ provides instruction via script**

teach

**user ++++++ uses the port epoch environment to request gc**

outta_juice

**users gather in channel CAFE to share ++++++**

poetry

#### Helpful scripts

`lore.data_check` can be used to answer `DATA_CHECK`:

```javascript
lore.data_check{lookup: "user ++++++ uses the port epoch environment to request gc"}
```

This would return `outta_juice`. You can pass in multiple answers separated by a
`\n` and it will return the combined answers as a single word. If you don't pass
in any answers, it will ask if you want to print out all possible answers.

[01]: https://hackmud.fandom.com/wiki/Lore