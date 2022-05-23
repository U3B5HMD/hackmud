# Locks

This document contains descriptions and spoilers for every lock I've encountered
in the game.

## Table of Contents
- [Tier 1](#tier-1)
  * [c001](#c001)
  * [c002](#c002)
  * [c003](#c003)
  * [EZ_21](#ez_21)
  * [EZ_35](#ez_35)
  * [EZ_40](#ez_40)
  * [l0cket](#l0cket)
  * [DATA_CHECK](#data_check)
    + [Answers](#answers)
- [Tier 2](#tier-2)
  * [acct_nt](#acct_nt)
  * [CON_SPEC](#con_spec)
  * [l0ckbox](#l0ckbox)
  * [magnara](#magnara)
- [Helpful scripts](#helpful-scripts)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


## Tier 1

### c001

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

### c002

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

### c003

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

To calculate the value of `c003_triad_2`, use the following formula.

```javascript
(colorIndex + 3) % 8;
```

If `red` has an index of 0, `green` has an index of 4. `(4+5) % 8` equals `1`
and `(4+3) % 8` equals `7` which means the complementary colors of `green`
are `orange` and `purple`.

An attempt at breaking an `c003` lock might look something like this:

```javascript
abandoned_jrttl_walker.info_xk490x{c003: "green", c003_triad_1: "orange", c003_triad_2: "purple"}
```

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
29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, and 97.

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
  - `vc2c7q`
  - `cmppiq`
  - `tvfkyq`
  - `uphlaw`
  - `6hh8xw`
  - `xwz7ja`
  - `sa23uw`
  - `72umy0`

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

## Tier 2

### acct_nt

The `acct_nt` lock is by far one of the most difficult T2 locks to crack. It
requires you to run `accts.transactions`, review the deposits and withdrawls and
then provide whatever amount it's asking for as the answer.

Possible `acct_nt` puzzles are:

```
What was the net GC between <start> and <end>
Need to know the total earned on transactions without memos between <start> and <end>
Need to know the total earned on transactions without memos between <start> and <end>
Get me the amount of a large deposit near <date>
Get me the amount of a large withdrawal near <date>
```

For example:

```
What was the net GC between 220515.0118 and 220518.0517
Need to know the total earned on transactions without memos between 220515.0118 and 220518.1457
Need to know the total earned on transactions without memos between 220515.0118 and 220518.1457
Get me the amount of a large deposit near 220518.1458
Get me the amount of a large withdrawal near 220519.1910
```

All dates will be in `YYMMDD.HHMM` format.

To this day, there is still much speculation about how, exactly, the `acct_nt`
lock works. Here's what is known so far:
  - The most transactions that a lock can look at is the last 16
  - If there are duplicate transactions on the same date, it could be 
    referencing any of them to create the answer
  - "near" can mean any transaction +/- 5 from the chosen date
  - The number of transactions it reviews is based on the `acct_nt_min` 
    property of the lock

Research has shown that `acct_nt` uses one of the following formulas to choose
the range of indexes it's going to use when building the answer:

 - `startDateIndex` to `endDateIndex`
 - `startDateIndex` + 1 to `endDateIndex`
 - `startDateIndex` to `endDateIndex` - 1 
 - `startDateIndex` + 1 to `endDateIndex` -1

The best way for you to break this lock is to:
  - Keep a 0GC balance on your account
  - flood your transaction list

To flood your transaction list, transfer 1GC back and forth between your
accounts until you have 16 _total_ transactions (8 deposits and 8 withdrawls,
one after the other). By doing this, you'll guarantee that the answer for the
`acct_nt` lock will always be either `0GC` or `1GC`. It'll look a little like
this when you're done:

```json
{
  "time": "220520.2246",
  "amount": "1GC",
  "sender": "account1",
  "recipient": "account2",
  "script": null
},
{
  "time": "220520.2246",
  "amount": "1GC",
  "sender": "account2",
  "recipient": "acount1",
  "script": null
}
{
  "time": "220520.2246",
  "amount": "1GC",
  "sender": "account1",
  "recipient": "account2",
  "script": null
},
{
  "time": "220520.2246",
  "amount": "1GC",
  "sender": "account2",
  "recipient": "acount1",
  "script": null
}
{
  "time": "220520.2246",
  "amount": "1GC",
  "sender": "account1",
  "recipient": "account2",
  "script": null
},
{
  "time": "220520.2246",
  "amount": "1GC",
  "sender": "account2",
  "recipient": "acount1",
  "script": null
}
...
```

### cON_SPEC

When you first encounter a `CON_SPEC` lock, pass it an empty string:

```javascript
<scriptname>.<loc>{CON_SPEC: ""}
```

The `CON_SPEC` lock comes in two flavors: weaver and wolf. What version you face
depends on your class. If you're a weaver, you'll be asked to solve a logic
puzzle. If you're a wolf, you'll be asked to host a public script. See the
[README section on classes][02] for more info.

For the weaver puzzle, you'll see something like this:

```
ACEGIKM
Provide the next three letters in the sequence
```

To solve it, you'll need to guess the next three letters in the sequence. The possible patterns are:

| Pattern                                         | Example                                             |
| ----------------------------------------------- | --------------------------------------------------- |
| Full alphabet, forwards                         | A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z |
| Full alphabet, backwards                        | Z	Y	X	W	V	U	T	S	R	Q	P	O	N	M	L	K	J	I	H	G	F	E	D	C	B	A |
| Skip every other letter, forwards               | A C E G I K M O Q S U W Y                           |
| Skip every other letter (offset), forwards      | B D F H J L N P R T V X Z                           |
| Skip every other letter, backwards              | Z X V T R P N L J H F D B                           |
| Skip every other letter (offset), backwards     | Y W U S Q O M K I G E C A                           |
| Skip every other two letters, forwards          | A	B	E	F	I	J	M	N	Q	R	U	V	Y	Z                         |
| Skip every two letters (offset by 1), forwards  | B	C	F	G	J	K	N	O	R	S	V	W	Z                           |
| Skip every two letters (offset by 2), forwards  | C	D	G	H	K	L	O	P	S	T	W	X                             |
| Skip every two letters (offset by 3), forwards  | A	D	E	H	I	L	M	P	Q	T	U	X	Y                           |
| Skip every other two letters, backwards         | Z	Y	V	U	R	Q	N	M	J	I	F	E	B	A                         |
| Skip every two letters (offset by 1), backwards | Y	X	U	T	Q	P	M	L	I	H	E	D	A                           |
| Skip every two letters (offset by 2), backwards | X	W	T	S	P	O	L	K	H	G	D	C                             |
| Skip every two letters (offset by 3), backwards | Z	W	V	S	R	O	N	K	J	G	F	C	B                           |

In the example, the answer would be OQS

### l0ckbox

The l0ckbox lock requires that you have a certain `k3y_v[1,2,3,4]` upgrade
loaded in order to break it. When you encounter a `l0ckbox` lock, it will
generate a message like: 

```
To unlock, please load the appropriate k3y: i874y3
```

In order to break this lock, you'll need to have a `k3y_v<n>` upgrade that has a
`k3y` property equal to the one it's requesting. To see what `k3ys` you have
loaded, run:

```javascript
sys.upgrades: {full: true}
```

You'll see something like this for any `k3y_v<n>` upgrades:

```
{
  rarity: "kiddie",
  name: "k3y_v1",
  type: "tool",
  up_class: "infiltrator",
  tier: 1,
  loaded: true,
  k3y: "i874y3",
  sn: "627818e01be6dd3a49a52a27",
  description: "Keep your nuutec l0cket safe with a security k3y",
  i: 12
}
```

In order to unlock the lock, this upgrade will need to be loaded on your system:

```javascript
sys.manage{load: 12}
```

Unlike most locks, `l0ckbox` doesn't announce itself with a traditional "Denied
access by" message, making it harder to detect using standard regular
expressions. Instead, check the lock response for `k3y:` and attempt to capture
what comes after the colon.

Any script cracker you write will have to be `lowsec` or lower in order to
manage what upgrades are available on the caller's system.

### magnara

The `mangara` lock requires you to guess the correct anagram (hence the name) in
order to break it. An example output looks like this:

```
recinroct magnara ulotnois orf: fuso
```

This translates to "incorrect anagram solution for: fuso". Your job is to take
the characters after the colon ("fuso") and rearrange them until you break the
lock. In this case possible solutions are:
  - fuso
  - ufso
  - sfuo
  - fsuo
  - usfo
  - sufo
  - oufs
  - uofs
  - fous
  - ofus
  - ufos
  - fuos
  - fsou
  - sfou
  - ofsu
  - fosu
  - sofu
  - osfu
  - osuf
  - souf
  - uosf
  - ousf
  - suof
  - usof

But you'll want to focus on results that are _actual_ words, first. Those are
more likely to be the correct answer. In this example, that would be "ufos".

## Helpful scripts

`lore.data_check` can be used to answer `DATA_CHECK`:

```javascript
lore.data_check{lookup: "user ++++++ uses the port epoch environment to request gc"}
```

This would return `outta_juice`. You can pass in multiple answers separated by a
`\n` and it will return the combined answers as a single word. If you don't pass
in any answers, it will ask if you want to print out all possible answers.

[01]: https://hackmud.fandom.com/wiki/Lore
[02]: ./README.md#class