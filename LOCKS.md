# Locks

This document contains descriptions and spoilers for every lock I've encountered
in the game.

## Table of Contents
- [Tier 1](#tier-1)
  * [CON_TELL](#con_tell)
  * [w4rn_er and w4rn](#w4rn_er-and-w4rn)
  * [EZ_21](#ez_21)
  * [EZ_35](#ez_35)  
  * [EZ_40](#ez_40)  
  * [c001](#c001)
  * [c002](#c002)
  * [c003](#c003)
  * [l0cket](#l0cket)
  * [DATA_CHECK](#data_check)
    + [Answers](#answers)
- [Tier 2](#tier-2)
  * [DATA_CHECK](#data_check-1)
    + [Answers](#answers-1)
  * [CON_SPEC](#con_spec)
  * [magnara](#magnara)
  * [l0ckbox](#l0ckbox)
  * [acct_nt](#acct_nt)
  * [sn_w_glock](#sn_w_glock)
- [Helpful scripts](#helpful-scripts)

## Tier 1

### CON_TELL

The `CON_TELL` lock isn't a lock in the tranditional sense. You can't break a
`CON_TELL` lock, you can only move past it.

When you encounter a `CON_TELL` lock, the lock will send a `chats.tell` to the
owner of the lock and alert them that a breach is in progress.

In order to get past a `CON_TELL` lock, simply call the system you're trying to
breach again.

The main purpose of this lock (and others like it) is to eat up the execution
time of any automated scripts that are attempting to breach the system. The more
time the script wastes getting past these locks, the less time it has to attempt
to breach the _real_ locks guarding the system.

### w4rn_er and w4rn

The `w4rn_er` and `w4rn` locks aren't a lock in the tranditional sense. You
can't break them, you can only move past them.

When you encounter one of these locks, the lock will display a warning message
to the attacking system. The content of the message can be changed by loading
the `w4rn_message` upgrade.

The main purpose of these locks (and others like them) is to eat up the
execution time of any automated scripts that are attempting to breach the
system. The more time the script wastes getting past these locks, the less time
it has to attempt to breach the _real_ locks guarding the system.

### EZ_21

To break an `EZ_21` lock, you need to provide one of three possible unlock
commands:   

<details> 
    <summary>Spoilers:</summary>

    `open`, `release`, or `unlock`. 
</details>

An attempt at breaking an `EZ_21` lock might look something like this:

```javascript
abandoned_jrttl_walker.info_xk490x{EZ_21: "unlock"}
```

### EZ_35

To break an `EZ_35` lock, you need to provide one of three possible unlock
commands: 

<details> 
    <summary>Spoilers:</summary>

    `open`, `release`, or `unlock`. 
</details>

The lock also requires a `digit` parameter with a value between 0 and 9
(inclusive).

An attempt at breaking an `EZ_35` lock might look something like this:

```javascript
abandoned_jrttl_walker.info_xk490x{EZ_35: "unlock", digit: 5}
```

### EZ_40

To break an `EZ_40` lock, you need to provide one of three possible unlock
commands: 

<details> 
    <summary>Spoilers:</summary>

    `open`, `release`, or `unlock`. 
</details>

The lock also requires an `ez_prime` parameter with a value being a prime number
between 2 and 97 (inclusive).

An attempt at breaking an `EZ_40` lock might look something like this:

```javascript
abandoned_jrttl_walker.info_xk490x{EZ_40: "unlock", ez_prime: 31}
```

Possible prime numbers are: 

<details> 
    <summary>Spoilers:</summary>

    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 
    73, 79, 83, 89, and 97.
</details>

### c001

To break a `c001` lock, you need to provide the correct color from the Hackmud
color wheel:

<details> 
    <summary>Spoilers:</summary>

    ```    
    0 red
    1 orange
    2 yellow
    3 lime
    4 green
    5 cyan
    6 blue
    7 purple
    ```
</details>

Please note that the order of these colors is important. The lock also requires
a `color_digit` parameter with a value equal to the number of characters in the
correct color for the lock.

An attempt at breaking an `c001` lock might look something like this:

```javascript
abandoned_jrttl_walker.info_xk490x{c001: "red", color_digit: 3}
```

### c002

To break a `c002` lock, you need to provide the correct color from the Hackmud
color wheel:

<details> 
    <summary>Spoilers:</summary>

    ```    
    0 red
    1 orange
    2 yellow
    3 lime
    4 green
    5 cyan
    6 blue
    7 purple
    ```
</details>

Please note that the order of these colors is important. The lock also requires
a `c002_complement` parameter that equals the complementary color of the `c002`
lock. 

To calculate the value of `c002_complement`, use the following formula:

<details> 
    <summary>Spoilers:</summary>

    ```javascript
    (colorIndex + 4) % 8;
    ```

    `colorIndex` is the index of the correct color for the `c002` parameter. 
    If `red` has an index of 0, `green` has an index of 4. `(4+4) % 8` equals 
    `0`, which means the complementary color of `green` is `red`.
</details>

An attempt at breaking an `c002` lock might look something like this:

```javascript
abandoned_jrttl_walker.info_xk490x{c002: "green", c002_complement: "red"}
```

### c003

To break a `c003` lock, you need to provide the correct color from the Hackmud
color wheel:

<details> 
    <summary>Spoilers:</summary>

    ```    
    0 red
    1 orange
    2 yellow
    3 lime
    4 green
    5 cyan
    6 blue
    7 purple
    ```
</details>

Please note that the order of these colors is important. The lock also requires
a `c003_triad_1` parameter and a `c003_triad_2` parameter.
lock. 

To calculate the value of `c003_triad_1`, use the following formula.

<details> 
    <summary>Spoilers:</summary>

    ```javascript
    (colorIndex + 5) % 8;
    ```

    To calculate the value of `c003_triad_2`, use the following formula.

    ```javascript
    (colorIndex + 3) % 8;
    ```    

    If `red` has an index of 0, `green` has an index of 4. `(4+5) % 8` equals 
    `1` and `(4+3) % 8` equals `7` which means the complementary colors of 
    `green` are `orange` and `purple`.

</details>

An attempt at breaking an `c003` lock might look something like this:

```javascript
abandoned_jrttl_walker.info_xk490x{c003: "green", c003_triad_1: "orange", c003_triad_2: "purple"}
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

<details> 
    <summary>Spoilers:</summary>
    <ul>
        <li>vc2c7q</li>
        <li>cmppiq</li>
        <li>tvfkyq</li>
        <li>uphlaw</li>
        <li>6hh8xw</li>
        <li>xwz7ja</li>
        <li>sa23uw</li>
        <li>72umy0</li>
    </ul>
</details>

An attempt at breaking a `l0cket` lock might look something like this:

```javascript
abandoned_jrttl_walker.info_xk490x{l0cket: "vc2c7q"}
``` 

### DATA_CHECK

The `DATA_CHECK` lock is by far the most frustrating Tier 1 lock available. To
break a `DATA_CHECK` lock, you'll need to be well versed in the [lore of
Hackmud][01]. 

When you encounter a `DATA_CHECK` lock, you'll receive the standard "Denied
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

<details> 
    <summary>Spoilers:</summary>

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
</details>

## Tier 2

### DATA_CHECK

To break a Tier 2 `DATA_CHECK` lock, you'll need to be well versed in the [lore
of Hackmud][01]. 

When you encounter a `DATA_CHECK` lock, you'll receive the standard "Denied
Access" message like any other lock. First, pass in an empty string:

```javascript
abandoned_jrttl_walker.info_xk490x{DATA_CHECK: ""}
```

This will trigger the lock and cause it to return the three questions it wants
you to answer:

```
**according to skimmerite pattern-seekers, the calibration initiative indicates that humans are ++++++**
**a person called anja has lost her ++++++**
**conditions are clear above ++++++ and the city is within operational radius**
```

Don't be fooled by the number of `+` in each blank: they're the same length
regardless of how many characters are in the answer. When answers
to a `DATA_CHECK` lock, combine each answer into a single word. 

An attempt at breaking a `DATA_CHECK` lock might look something like this:

```javascript
abandoned_jrttl_walker.info_xk490x{DATA_CHECK: "fran_leerobovacsentience"}
``` 

#### Answers

Here are all the possible questions and answers for a Tier 2 `DATA_CHECK` lock:

<details> 
    <summary>Spoilers:</summary>
    
**a person called anja has lost her ++++++**

blazer

**according to skimmerite pattern-seekers, the calibration initiative indicates that humans are ++++++**

dead

**according to the calibration initiative, humans are expected to be ++++++ by the content**

engaged

**according to the suborbital bulletin, flight ++++++ is en route to ho chi min**

a2231

**archaic labs specialises in user-++++++ design**

obsessive

**conditions are clear above ++++++ and the city is within operational radius**

atlanta

**data does not contain truth is the first part of an idiom spread by the ++++++ assembly**

skimmerite

**drones from ++++++ may be instructed to perform their task with excessive urgency**

goodfellow

**item_id py6874 contains a grand ++++++**
piano

**robovac_++++++, moreso than most of its kind, has a tendency to become stuck**

idp1p1

**robovac_idk3w2 is stuck in a ++++++**

well

**sheriff nub holds sway over the town of ol' ++++++**

nubloopstone

**sheriff nub's first name is ++++++**

sheriff

**the ascent of ++++++ does not concern itself with usefulness**

nowhere

**the fourth hidden theme is ++++++**

executives

**the listed components of the breakfast galleon are inside, outside, and ++++++**

crowsnest

**this council of 'revolutionary' robovac-patterns call themselves the ++++++**

thirteen

**trust has a diagnostic system. a functioning version can be found at erajbhandari.++++++**

diagalpha

**user ++++++ would leave no stars for the sqrz 480 if they could**

bnnyhunter

**user le_mon_squeezy's new s:o ref is ++++++**

unvarnishedpygmyumbrella
</details>

### CON_SPEC

When you first encounter a `CON_SPEC` lock, pass it an empty string:

```javascript
abandoned_jrttl_walker.info_xk490x{CON_SPEC: ""}
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

To solve it, you'll need to guess the next three letters in the sequence. The
possible patterns are:

<details> 
    <summary>Spoilers:</summary>
    
| Pattern                                         | Example                                             |
| ----------------------------------------------- | --------------------------------------------------- |
| Full alphabet, forwards                         | A B C D E F G H I J K L M N O P Q R S T U V W X Y Z |
| Full alphabet, backwards                        | Z Y X W V U T S R Q P O N M L K J I H G F E D C B A |
| Skip every other letter, forwards               | A C E G I K M O Q S U W Y                           |
| Skip every other letter (offset), forwards      | B D F H J L N P R T V X Z                           |
| Skip every other letter, backwards              | Z X V T R P N L J H F D B                           |
| Skip every other letter (offset), backwards     | Y W U S Q O M K I G E C A                           |
| Skip every other two letters, forwards          | A B E F I J M N Q R U V Y Z                         |
| Skip every two letters (offset by 1), forwards  | B C F G J K N O R S V W Z                           |
| Skip every two letters (offset by 2), forwards  | C D G H K L O P S T W X                             |
| Skip every two letters (offset by 3), forwards  | A D E H I L M P Q T U X Y                           |
| Skip every other two letters, backwards         | Z Y V U R Q N M J I F E B A                         |
| Skip every two letters (offset by 1), backwards | Y X U T Q P M L I H E D A                           |
| Skip every two letters (offset by 2), backwards | X W T S P O L K H G D C                             |
| Skip every two letters (offset by 3), backwards | Z W V S R O N K J G F C B                           |
</details>

In the example, the answer would be `OQS`.

### magnara

The `mangara` lock requires you to guess the correct anagram (hence the name) in
order to break it. An example output looks like this:

```
recinroct magnara ulotnois orf: fuso
```

This translates to "incorrect anagram solution for: fuso". Your job is to take
the characters after the colon ("fuso") and rearrange them until you break the
lock.

The number of letters you get from the lock depends on what tier the lock is, so
brute forcing the answer (trying every possible combination) doesn't scale. A
three character lock may only have 6 possible combinations but a 4 character
lock has 24 possible combinations.

<details> 
    <summary>Spoilers:</summary>

You'll want to focus on results that are _actual_ words. Those are
more likely to be the correct answer. In this example, that would be "ufos".
</details>

### l0ckbox

The l0ckbox lock requires that you have a certain `k3y_v[1,2,3,4]` upgrade
loaded in order to break it. When you encounter a `l0ckbox` lock, it will
generate a message like: 

```
To unlock, please load the appropriate k3y: i874y3
```

<details> 
    <summary>Spoilers:</summary>

In order to break this lock, you'll need to have a `k3y_v<n>` upgrade that 
has a `k3y` property equal to the one it's requesting. To see what `k3ys` 
you have loaded, run:

```javascript
sys.upgrades: {full: true}
```

You'll see something like this for any `k3y_v<n>` upgrades:

```javascript
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
</details>

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

<details> 
    <summary>Spoilers:</summary>

The best way for you to break this lock by hand is to:
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
</details>

### sn_w_glock

When you discover an `sn_w_glock`, the first thing you should do is set your
account balance to 0. If you provide it with an incorrect answer, it will take
money from your account. The higher tier versions of the lock will take more
money than lower tiers. There is a good chance you could lose everything.

To set your account balance to zero, first run:

```javascript
accts.balance{}
```

Then, transfer that balance to your alt account:

```javascript
accts.xfer_gc_to{to: "<alt username>", amount: "<amount as number or GC string>"}
```

Next, call the lock with an empty string:

```javascript
abandoned_jrttl_walker.info_xk490x{sn_w_glock: ""}
```

You'll receive a response that contains one of the following key words:

  - `beast`
  - `elite`
  - `hunter`
  - `magician`
  - `meaning`
  - `monolithic`
  - `secret`
  - `secure`
  - `special`

The lock wants you to have a specific balance in your account. If you have a
balance other than the one it wants **it will steal GC from your account.**

<details> 
    <summary>Spoilers:</summary>

Based on the keyword, here's the balance that's required.

| String     | Amount  | Reference                                         |
| ---------- | ------- | ------------------------------------------------- |
| beast      | 666GC   | Mark of the beast                                 |
| elite      | 1337GC  | leet                                              |
| hunter     | 3K006GC | 30.06 hunting rifle caliber                       |
| magician   | 1K89GC  | Magic number                                      |
| meaning    | 42GC    | Hitch Hiker's Guide to the Galaxy                 | 
| monolithic | 2K1GC   | 2001 Space Odyssey                                |
| secret     | 7GC     | 007 Secret Agent                                  |
| secure     | 443GC   | 443 is SSL/HTTPS (which is more secure than HTTP) |
| special    | 38GC    | .38 Special                                       |

To make it easier to quickly transfer money between accounts, set up the
following macros on your alt. Set `<username>` to the user that you use to hack:

```
/beast = accts.xfer_gc_to { to:"<username>", amount:"666GC" }
/elites = accts.xfer_gc_to { to:"<username>", amount:1337 }
/hunter = accts.xfer_gc_to { to:"<username>", amount:3006 }
/magician = accts.xfer_gc_to { to:"<username>", amount:"1K89GC" }
/meaning = accts.xfer_gc_to { to:"<username>", amount:"42GC" }
/monolithic = accts.xfer_gc_to { to:"<username>", amount:"2K1GC" }
/secret = accts.xfer_gc_to { to:"<username>", amount:7 }
/secure = accts.xfer_gc_to { to:"<username>", amount:"443GC" }
/special = accts.xfer_gc_to { to:"<username>", amount:38 }
```
</details>

## Helpful scripts

`lore.data_check` can be used to answer `DATA_CHECK`:

```javascript
lore.data_check{lookup: "user ++++++ uses the port epoch environment to request gc"}
```

This would return `outta_juice`. You can pass in multiple answers separated by a
`\n` and it will return the combined answers as a single word. If you don't pass
in any answers, it will ask if you want to print out all possible answers.

`dictionary.lookup` and `ast.magnara_solver` can be used to solve magnara locks.

[01]: https://hackmud.fandom.com/wiki/Lore
[02]: ./README.md#class