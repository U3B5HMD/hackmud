---
title: acct_nt
parent: Lock Guide
---

# acct_nt

### acct_nt

The `acct_nt` lock is by far one of the most difficult T2 locks to crack. It
requires you to run `accts.transactions`, review the deposits and withdrawls and
then provide whatever amount it's asking for as the answer.

Possible `acct_nt` questions are:

```
What was the net GC between <start> and <end>
```

```
Need to know the total earned on transactions without memos between <start> and <end>
```

```
Need to know the total earned on transactions without memos between <start> and <end>
```

```
Get me the amount of a large deposit near <date>
```

```
Get me the amount of a large withdrawal near <date>
```

For example:

```
What was the net GC between 220515.0118 and 220518.0517
```

```
Need to know the total earned on transactions without memos between 220515.0118 and 220518.1457
```

```
Need to know the total earned on transactions without memos between 220515.0118 and 220518.1457
```

```
Get me the amount of a large deposit near 220518.1458
```

```
Get me the amount of a large withdrawal near 220519.1910
```

All dates will be in `YYMMDD.HHMM` format.

## How to Crack

To crack an `acct_nt` lock, you need to provide the correct GC value as either a
string:

```javascript
abndnd_m2j0yc.access_0fcpi1{acct_nt: "5GC"}
```

or a number:

```javascript
abndnd_m2j0yc.access_0fcpi1{acct_nt: 5}
```

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

## Notes

There is still much speculation about how, exactly, the `acct_nt` lock works.
Here's what is known so far:
  - The most transactions that a lock can look at is the last 16
  - If there are duplicate transactions on the same date, it could be
    referencing any of them
  - "near" can mean any transaction plus or minus 5 entries from the chosen date
  - The number of transactions it reviews is based on the `acct_nt_min` 
    property of the lock

Research has shown that `acct_nt` uses one of the following formulas to choose
the range of indexes it's going to use when building the answer:

 - `startDateIndex` to `endDateIndex`
 - `startDateIndex` + 1 to `endDateIndex`
 - `startDateIndex` to `endDateIndex` - 1 
 - `startDateIndex` + 1 to `endDateIndex` -1
