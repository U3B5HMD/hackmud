---
title: magnara
parent: Lock Guide
---

# magnara

The `magnara` lock requires you to guess the correct anagram (hence the name) in
order to break it. An example output looks like this:

```
recinroct magnara ulotnois orf: fuso
```

This translates to "incorrect anagram solution for: fuso". Your job is to take
the characters after the colon ("fuso") and rearrange them until you break the
lock.

## How to Crack

The number of letters you get from the lock depends on what tier the lock is, so
brute forcing the answer (trying every possible combination) would take too
long. A three character lock may only have 6 possible combinations but a 4
character lock has 24 possible combinations.

You'll want to focus on results that are _actual_ words. Those are
more likely to be the correct answer. In this example, that would be "ufos".