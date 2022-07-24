---
title: CON_TELL
parent: Lock Guide
---

# CON_TELL

The `CON_TELL` lock isn't a lock in the tranditional sense. You can't break a
`CON_TELL` lock, you can only move past it.

When you encounter a `CON_TELL` lock, the lock will send a `chats.tell` to the
owner of the lock and alert them that a breach is in progress.

In order to get past a `CON_TELL` lock, simply call the system you're trying to
breach again.

The main purpose of this lock (and others like it) is to eat up the execution
time of any automated scripts that are attempting to breach the system. In this
case, `CON_TELL`'s use of `chats.tell` takes up several milliseconds of
execution time (depending on server load). The more time the script wastes
getting past these locks, the less time it has to attempt to breach the _real_
locks guarding the system.