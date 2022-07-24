---
title: sn_w_glock
parent: Lock Guide
---

# sn_w_glock

The `sn_w_glock` is unique in that, it requires you to have the correct account
balance (GC) to crack it. If you don't have the correct balance when you attempt
to breach the lock, the lock will still most if not all of your money.

The first thing you should do when you encounter an `sn_w_glock` lock is
transfer all of your GC to your alt account. To set your account balance to
zero, first run:

```javascript
accts.balance{}
```

Then, transfer that balance to your alt account:

```javascript
accts.xfer_gc_to{to: "<alt username>", amount: "<amount as number or GC string>"}
```

Next, call the lock to see what balance it requires:

```javascript
abndnd_m2j0yc.access_0fcpi1{sn_w_glock: ""}
```

You'll receive a response with the following sentences:

```
That's not an elite's balance at all
```

```
That balance was not secret
```

```
There's nothing special about that balance
```

```
That's not a hunters balance
```

```
That balance would not be chosen by a magician
```

```
It seems like your balance could be more secure
```

```
That balance isn't monolithic
```

```
That balance has no meaning
```

```
That balance is not the mark of the beast
```

These phrases are clues to what account balance you need to bypass the lock.

## How to Crack

To crack an `sn_w_glock`, you need to have a specific account balance. Based on
the keywords in the phrase you received from the lock, here are the possible
values:

| String     | Amount  | Reference                                         |
| :--------- | :------ | :------------------------------------------------ |
| beast      | 666GC   | Mark of the beast                                 |
| elite      | 1337GC  | leet                                              |
| hunter     | 3K006GC | 30.06 hunting rifle caliber                       |
| magician   | 1K89GC  | Magic number                                      |
| meaning    | 42GC    | Hitch Hiker's Guide to the Galaxy                 |
| monolithic | 2K1GC   | 2001 Space Odyssey                                |
| secret     | 7GC     | 007 Secret Agent                                  |
| secure     | 443GC   | 443 is SSL/HTTPS (which is more secure than HTTP) |
| special    | 38GC    | .38 Special                                       |


In order to get they money you'll need to crack the lock, switch to your alt account:

```javascript
user <alt username>
```

Next, transfer the required balance to your main account:

```javascript
accts.xfer_gc_to{to: "<main username>", amount: "<amount as number or GC string>"}
```

Then, switch back to your main account:

```javascript
user <main username>
```

And call the lock again:

```javascript
abndnd_m2j0yc.access_0fcpi1{sn_w_glock: ""}
```

## Notes

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
