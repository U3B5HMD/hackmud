---
title: Tier 1
parent: Hacking Guide
---

# Tier 1

Tier 1 is the safest hacking tier: Tier 1 content is `FULLSEC` and can't steal
your GC or harm your system.

## How to Find Tier 1 Corporations

There are two ways to find Tier 1 corporations: completing
[quests](/overview/prove-your-sentience#quests) and searching `FULLSEC`
[sectors](/gameplay/sectors).

### Quests

When you finish a quest, you'll be given the name of a corporation's public
script. Once you solve the script, you'll be given a list of locs that you can
attempt to crack.

### Searching Sectors

Corporations' `public` scripts can be found by searching `FULLSEC` sectors. All
`public` corporation scripts end in `.public`.

## How to Hack Tier 1 Corporations

When you run a Tier 1 corporation's `public` script, you'll see something like
this:

![](../../assets/images/tier-1-corp-1.png)

Every `public` corporations script has the same basic format:

```
<Header graphic>
Welcome to <corporation name>'s public information script. Please refrain from engaging in criminal activity.
<blog> | <description> |
```

First, run the script again but with brackets:

```javascript
weyland.public{}
```

You'll see something like this:

![](../../assets/images/tier-1-corp-2.png)

This is telling you how to access the different commands in the script as well
as a sample command to run. Run the command it gives you:

```
No password specified.
```

To get the password, run:

```
weyland.public{show: "description"}
```

And you'll see some information about the company:

```
In the mood to put something a little different in your stomach? Come out to Weyland Yutanihama! The freshest raw food in town.
We are calling this strategy plantowin and we will strive to deliver on this promise
```

Notice the second sentence has a strange grouping of words in the middle.
`plantowin` is the password:

```javascript
wayland.public{show: "dir", password: "plantowin"}
```

If you still get a `no password specified` error, try different variations on
the key `password`:
  - `pass`,
  - `p`

Once you have entered the password correctly, you'll see:

```
Authenticated. Please specify a project.
```

Now, run the `public` script again with the `<blog>` option:

```javascript
weyland.public{show: "news"}
```

You'll see a series of blog posts:

![](../../assets/images/tier-1-corp-3.png)

These posts will reference project names:

```
Work continues on ragnaroxx.sh, hope is held out that it might connected to a cure for Welsh Measles.
```

Run the `public` script again with the project:

```javascript
weyland.public{show: "dir", p: "plantowin", project: "ragnaroxx.sh"}
```

If you get the project name correct, you'll see a list of locs you can attempt
to crack. There are multiple project names hidden in the blog posts. Each
project name will get you a different set of locs.

## Tier 1 Corporations List

See [_References: Corporations_](/references/corporations) for a complete list
of corporations.