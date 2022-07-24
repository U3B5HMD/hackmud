---
title: CON_SPEC
parent: Lock Guide
---

# CON_SPEC

When you first encounter a `CON_SPEC` lock, pass it an empty string:

```javascript
abandoned_jrttl_walker.info_xk490x{CON_SPEC: ""}
```

The `CON_SPEC` lock comes in two flavors: `weaver` and `wolf`. What version you
face depends on your class. If you're a `weaver`, you'll be asked to solve a
logic puzzle. If you're a `wolf`, you'll be asked to host a public script. See
the [section on classes](/gameplay/system#class) for more info on classes.

For the `weaver` puzzle, you'll see something like this:

```
ACEGIKM
Provide the next three letters in the sequence
```

To solve it, you'll need to guess the next three letters in the sequence. 

## How to Crack

There's a limited number of patterns that the `CON_SPEC` lock uses:
  
| Pattern                                         | Example                                             |
| :---------------------------------------------- | :-------------------------------------------------- |
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

In the example, the answer would be `OQS`. To crack this lock by hand, I
recommend keeping this table handy and searching it for the string the lock
gives you.