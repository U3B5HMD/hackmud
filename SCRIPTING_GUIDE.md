# Scripting Guide

This guide will cover the basics of writing custom scripts in Hackmud.

## Table of Contents
- [Target Audience](#target-audience)
- [Terminology](#terminology)
  * [Scriptor](#scriptor)
  * [Subscript](#subscript)
  * [Bot Brain](#bot-brain)
  * [Cracker](#cracker)
  * [Harvester / Scraper](#harvester--scraper)
- [A Basic Script Example](#a-basic-script-example)
- [Outputting Text to the Screen](#outputting-text-to-the-screen)
- [Tips for Writing Your First Script](#tips-for-writing-your-first-script)
  * [Finding Balance: Size vs Time](#finding-balance--size-vs-time)
  * [Don't Catch Errors](#don-t-catch-errors)
  * [Let Go of Const](#let-go-of-const)
  * [Create (Tiny) Helper functions](#create--tiny--helper-functions)
  * [Declare Everything at Once](#declare-everything-at-once)
  * [Don't Type Check](#don-t-type-check)
  * [Don't use Booleans](#don-t-use-booleans)
  * [Look for Patterns (and Learn Regex)](#look-for-patterns--and-learn-regex-)
  * [Use Minification](#use-minification)
- [How to Test Your Script](#how-to-test-your-script)
- [How to Debug Your Scripts In-game](#how-to-debug-your-scripts-in-game)
- [How to Use This Repo to Write Scripts](#how-to-use-this-repo-to-write-scripts)
  * [Use Emulators for Testing](#use-emulators-for-testing)
  * [Use Hackmud Class for Calling Scriptors](#use-hackmud-class-for-calling-scriptors)
- [Converting a String into a Scriptor](#converting-a-string-into-a-scriptor)
- [Special Script Variables](#special-script-variables)
- [Database Commands](#database-commands)
  * [Create New Documents](#create-new-documents)
  * [Read/Find Existing Documents](#read-find-existing-documents)
  * [Updating Existing Documents](#updating-existing-documents)
  * [Deleting Documents](#deleting-documents)
- [Additional Scripting Guides](#additional-scripting-guides)

## Target Audience

This guide is written for players who already have experience writing JavaScript
and possible have a background in software engineering or web development. If
you're new to JavaScript or coding in general, I suggest checking out the 
[_JavaScript Basics_][01] guide by the Mozilla Developer Network (MDN).

## Terminology

### Scriptor

A scriptor is another, in-game script that you pass to your script as a
parameter:

```javascript
lock_cracker{t: #s.anon_jrttle.abc123}
```

In this example, we're passing the loc `anon_jrttle.abc123` to our
`lock_cracker` script as an argument.

### Subscript

A subscript is a hard-coded script that we have to use immediately:

```javascript
function(context, args) {
    const lib = #fs.lib();
}
```

We cannot store the `lib` function to a variable:

```javascript
function(context, args) {
    // This won't work
    const lib = #fs.lib();
}
```

All subscripts start with a `#` and a two letter abbreviation that specifies the
script's security level. For example, if you wanted to get the `loc` of the
player that invoked the script:

```javascript
function(context, args) {
    const loc = #ls.sys.loc();
}
```

The `ls` is short for LOWSEC, the security level of the `sys.loc` script.

### Bot Brain

An a script designed to run user commands without user intervention.

### Cracker

A script designed to unlock one or more locks.

### Harvester / Scraper

A script designed to automatically collect information from the output of a
script. For example, a loc harvester would harvest locs from a corporation.

## A Basic Script Example

Scripts in Hackmud all have the same signature: an anonymous function that takes
two arguments.

```javascript
function(context, args) {
    return "Hello world!";
}
```

`context` is an object that represents the context the script was run from. Not
to be confused with `context` in a traditional JavaScript environment, the
`context` param contains information about who called the script that's running
as well as information about the script itself:
  - `caller`: The name of the user who called the script.
  - `this_script`: the name of the script currently running.
  - `is_scriptor`: `true` if the script is being run as a scriptor.
  - `is_brain`: true if the script is being run via a bot brain
  - `cols`: The number of columns in the caller's terminal.
  - `rows`: The number of rows in the caller's terminal.

`args` is an object containing any arguments passed into the script when it was
run from the in-game terminal. If no arguments were passed, `args` will be
`null`.

When you call a trust script like `sys.loc` from a script, it's called from the
account of the user who ran your script. So, in this example, `sys.loc` would
return the `loc` of the user running the script, not the loc of the script's
owner.

## Outputting Text to the Screen

Any value you return from your script will be printed to the screen in game.
This script:

```javascript
function(context, args) {
    return "Hello world!";
}
```

will print "hello world".

## Tips for Writing Your First Script

### Finding Balance: Size vs Time

Every system in Hackmud starts with a 500 character limit for scripts and 1
script slot; you'll only be able to upload a single script at a time
and that script will be 500 characters or less in length. Additionally, a script
is only allowed to run for 5000ms before it is terminated by the server.

Calls to a subscript are not instantaneous. A single call can take up to 250ms
to complete.

So, if you're trying to brute force a lock with 15 possible answers, it could
take as long as 2.5 seconds to break the lock. But, if you add logic to try call
the lock as few times as possible, you could run over the 500 character limit.

It's up to you to find the right balance.

### Don't Catch Errors

Error handling is all but useless becuase of how much space it takes. You're
better off supplying a default value for a function response than trying to do
some kind of `try-catch`

### Let Go of Const

JavaScript may support declaring variables with `const`, but `let` has fewer
characters. Always use `let`.

### Create (Tiny) Helper functions

If you're calling `Array.concat()` or `String.split()` in your code a lot,
you're better off creating a helper function to save space:

```javascript
let split = (s) => s.split("\n");
```

Remember: minification can't rename object properties or methods, but it can
safely rename functions.

### Declare Everything at Once

Instead of doing this:

```javascript
function(context, args) {
    let lock;
    let answer;
    let result;
}
```

Do this:

```javascript
function(context, args) {
    let lock, answer, result;
}
```

You'll save 3 characters for every variable you would have declared separately.

### Don't Type Check

Avoid `===` for comparisons and check for truthy and falsey values instead of
booleans.

### Don't use Booleans

Setting a variable to `1` will have the same effect as setting it to `true`.

### Look for Patterns (and Learn Regex)

The key to writing an effective script (especially a lock cracker) is to look
for patterns in script output. For example, All EZ locks start with `EZ_`.
Everything in Hackmud follow some kind of pattern. Once you figure out what
those patterns are, you'll be much more effective at scripting.

Also, if you don't know [Regex][03], now's the time to learn.

### Use Minification

A lot of scripts you'll come across online are written with single-letter
variables. While this is an effective way to keep your script under the 500
character limit, it makes it impossible to update and maintain those scripts in
the future. 

Instead, use a minification script like [babel-minify][02] to minify your
scripts before uploading.

## How to Test Your Script

The best way to test your script is to upload it to Hackmud and run it. However,
this takes a lot of time and requires that you have access to the type of thing
you're trying to run your script against (e.g., a lock or a corporation).
Instead, I recommend you create a script that emulates the behavior of the thing
you're trying to target.

## How to Debug Your Scripts In-game

Use the `#D()` function to log out data during your scripts run. Whatever is
passed to `#D()` will be printed to the screen even if your script takes more
than 5000ms to run. If you use `#D` in your script, any value returned by the
function will *not* be printed to the screen.

```javascript
function(context, args) {
    #D(args); // Prints all passed in args to the screen

    return "hello world"; // will not be printed to the screen
}
```

## How to Use This Repo to Write Scripts

This repo is designed to help you develop scripts for Hackmud without having
to jump back and forth between the game and your IDE.

### Use Emulators for Testing

This repository contains fully functional cracking and harvesting scripts that
you can use on your own or as inspiration for your own cracker or harvester.

It also contains emulators for various tier 1 locks and corporations. For
examples of how to use these emulators to test your cracker/harvester, see the
`test/` folder.

### Use Hackmud Class for Calling Scriptors

In JavaScript, you can't use `#` in front of a variable or method unless it's
part of a class. To avoid syntax errors while calling a scriptor, import the
`Hackmud` class and use its methods.

Instead of:


```javascript
function (context, args) {
    const lib = #.fs.lib();
}
```

Do:

```javascript
import Hackmud from "../src/hackmud.js";

function (context, args) {
    const lib = Hackmud.fs.lib();
}
```

During the publishing process, the `import` statement will be stripped out and
`Hackmud.` will be replaced with `#`.

## Converting a String into a Scriptor

You cannot convert a string into a Scriptor. For game balance / security
reasons, it can't be done.

## Special Script Variables

`_START`/`_ST`: A timestamp that represents when a script started to run. You
can use this to calculate how long your script has been running for (in
milliseconds).

```javascript
 const diff = Date.now() - _START;
```

`_END`: A timestamp that represents when your script finished.

`_TIMEOUT`/`_TO`: How long your script is allowed to run for. Always 5000ms.

## Database Commands

Every Hackmud user has access to a Mongo DB that they can use to store data for
later retrieval. The two mains reason you would store data in Mongo is to save
characters in your script and to deal with slow locs.

You can save characters in your script by storing commonly used constants in the
database instead of in your code:

```javascript
#db.u1(
    { _id: "constants" },
    {
        _id: "constants",
        unlocks: [
            "unlock",
            "release",
            "open"
        ],
        digits: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
        primes: [
            2, 3, 5, 7, 11, 13, 17,
            19, 23, 29, 31, 37, 41,
            43, 47, 53, 59, 61, 67,
            71, 73, 79, 83, 89, 97
        ],
        colors: [
            "red",
            "orange",
            "yellow",
            "lime",
            "green",
            "cyan",
            "blue",
            "purple"
        ]
    }
);

return #db.f({ _id: "constants" }).array();
```

Additionally, if your script keeps timing out while trying to breach a loc, you
could store known correct answers for a loc in the database between attempts.
That way, the only calculations you'll need to do on the subsequent run is for
the answers you don't already have:

```javascript
function cracker(context, args) {
    let answers = {},
    lib = #fs.sys.lib(),
    prevAnswers = #db.f(_id: "prev_answers").first();

    if(prevAnswers) {
        answers = prevAnswers;
    }

    if(!can_continue_execution(Date.now() - _START)) {
        #db.i{_id: "prev_answers", v: answers};
    }
    
    // Continue breaking lock
}
```

### Create New Documents

`#db.i(document)` Creates a new document in the database. 

```javascript
#db.insert({_id: "names", value: ["john", "jacob"]})
```

### Read/Find Existing Documents

`#db.find(query)` finds every document that matches the passed in query. See
[`db.collection.find`][08] for more info. 

If you want to find every document that's been inserted in the DB:

```javascript
#db.find({}).array()
```

To find a specific document:

```javascript
#db.f({ _id: "names" }).array()
```

`#db.f(query, projection)` return an object with two methods: `array` and
`first`. `array` returns all documents that match the query. `first` returns the
first document that matches the query.

`projection` specifies the fields to return in the documents that match the
query filter. To return all fields in the matching documents, omit this
parameter. 

### Updating Existing Documents

`#db.u(query, command)` updates any documents that match the passed in query;
returns an object with two methods: `array` and `first`. `array` returns all
documents that match the query. `first` returns the first document that matches
the query. See[`db.collection.update`][08] for more info. 

```javascript
#db.update({_id: "names"}, {$set: {value: ["john", "jacob"]}})
```

`#db.u1(query, command)` functions just like `#db.u`, except only update the
first document that matches the query. Additionally, any objecy you pass in as
`command` will replace the matching document without the need to use `$set`.

`#db.us(query, command)` This command functions just like `#db.u`, but if no
documents match the query, one document will be inserted based on the properties
in both the query and the command.

### Deleting Documents

`#db.r(query)` Removes a document from the database that matches the passed in
query. See [`db.collection.remove`][07] for more info.

```javascript
#db.r({_id: "names"})
```

## Additional Scripting Guides

If you need more information, check these out:
  - [Scripting Reference on the Hackmud Forums][04]
  - [Hackmud Lock Cracking Guide By Greg Smith][05]
  - [Common Scripting Errors and Causes][06]

[01]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/javascript_basics
[02]: https://babeljs.io/docs/en/babel-minify
[03]: https://developer.mozilla.org/en-US/docs/Web/javascript/Guide/Regular_Expressions
[04]: https://www.hackmud.com/forums/general_discussion/scripting_reference
[05]: https://observablehq.com/@smrq/hackmud-lock-cracking
[06]: https://hackmud.com/forums/general_discussion/common_script_errors_and_causes
[07]: https://www.mongodb.com/docs/manual/reference/method/db.collection.remove/
[08]: https://www.mongodb.com/docs/manual/reference/method/db.collection.find/
[09]: https://docs.mongodb.com/manual/reference/method/db.collection.update/
