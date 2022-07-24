---
title: Configuring the UI
parent: Overview
nav_order: 2
---

# Configuring the UI

## Configure Chat Message Display

**Usage:**

```
gui.chats{shell: <boolean>, chat: <boolean>}
```

By default, chat messages are sent to the shell (the main part of the screen)
and the chat window. This makes it easy to see new messages when they come in
but it also means that chat messages will interrupt any text on the screen while
you're working on something.

To turn off chat messages in the shell, set `shell` to `false`. To turn off
chat messages in the chat window, set `chat` to `false`.

## Mute Messages from Users

**Usage:**

```
gui.quiet{add: <username>, remove: <username>, list: <boolean>, clear: <boolean>}
```

Use this script if you want to grey-out chat messages from specific users. It
doesn't actually remove them from the chat window, unfortunately. It's also
quite buggy. If the user you've "quieted" puts newlines in their message, every
line after the first newline comes through normally (not grayed out). If you
want to hang out in `0000` but want to reduce the bot noise, add these names to
your quiet list with:

```javascript
gui.quiet{add: "<username>"}
```

**add:** Adds the passed in username to the quiet list.

**remove:** Adds the passed in username from the quiet list.

**list:** If true, lists all users on the quiet list.

**clear:** Removes all users from the quiet list.

## Change the Size of the UI

**Usage:**

```
gui.size(i: <-20 to 20>)
```

Use this script to make your UI larger or smaller. 20 is really big and -20 is
so small it's almost invisible.

## Change The Levels of Visual Effects

**Usage:**

```
gui.vfx{ bloom:<0-11>, noise:<0-11>, scan:<0-11>, bend:<0-11>}
```

Use this script to change the level of text bloom, visual noise, scanlines, and
animations.

## Change the Volume of Sound Effects and Background Music

**Usage:**

```
gui.vol {sfx:<0-11>, bgm:<0-11>}
```

Use this script to change the volume of the sound effects and background music.

## Reset Autocompletes

To reset the scripts included in your autocomplete list:

```
autos.reset
```

This will remove any scripts from your autocompletes (including those listend in
`trust`). After running this command, run `scripts.trust` to restore the trust
scripts to your autocompletes.