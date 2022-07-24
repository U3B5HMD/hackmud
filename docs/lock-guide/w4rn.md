---
title: w4rn_er and w4rn
parent: Lock Guide
---

# w4rn_er and w4rn

The `w4rn_er` and `w4rn` locks aren't a lock in the tranditional sense. You
can't break them, you can only move past them.

When you encounter one of these locks, the lock will display a warning message
to the attacking system. The content of the message can be changed by loading
the `w4rn_message` upgrade.

Originally, the length of a `w4rn_message` wasn't limited, so clever weavers
could send _massive_ amounts of data to the attacking system. This would make it
almost impossible to play the game or even crash the client. Now, the message is
limited to 100 characters.

The only way you can use `w4rn` as a defense is by displaying a fake `denied
access` message for lock you don't have and hope that whatever script is running
against your system reads that line and gives up instead of the actual system
message that appears right after it.

If any user does load a `w4rn` on their system, they do it to post memes and
insults to their attacker.
