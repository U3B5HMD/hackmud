---
title: Chatting with Other Users
parent: Overview
nav_order: 3
---

# Chatting with Other Users

## Join and Leave a Channel

When you first exit the VLAN, you'll be dropped into the `0000` chat channel. To
join a chat channel, run:

```javascript
chats.leave{channel: "<channel>"}
```

To join another channel run:

```javascript
chats.join{channel: "<channel>"}
```

Each channel you join counts against the total `channel_count` allowed on your
system.

## List the Channels You're Currently In

To see what channels you are currently in, run:

```javascript
chats.channels
```

## Send and Receive Messages

Depending on how you've [configured your UI][15] chat messages will either show
up in the main part of the screen (shell) or in the chat window on the right.

Every message from every channel you have joined will be visible (unless you've
quieted the user) as well as any tells (direct messages) sent to you.

To send message to a channel, run:

```javascript
chats.send{channel: "<channel>", msg: "<message>"}
```

To send message to a single user, run:

```javascript
chats.send{to: "<username>", msg: "<message>"}
```

## Mute User

See [_Mute Messages from Users_][16] under _Configuring the UI_

## Use the Chat Window

The fastest way to chat with a person or channel in Hackmud is to use the chat
window (vs writing out individual `chats.tell` or `chats.send` commands).

By default, it will send a message to whatever channel you last ran `chats.send`
against. 

### Send All Messages to a Specific Channel 

If you want all messages you send from the chat window to go to a specific
channel, type the following in the chat window and press enter:

```javascript
%<channel>
```

For example: 

```javacript
%town
```

You will see the following message in the chat window:

> chatting to channel: town

Now all of your messages sent from chat window will be sent to the `town`
channel. If you attempt to send messages to a channel you are not currently in
or that doesn't exist, you will receive an error message.

### Chat With a Specific User

If you want to use the chat window to send messages to a specific user, type the
following into the chat window and press enter:

```javascript
+<username>
```

For example: 

```javacript
%hackmudguide
```

You will see the following message in the chat window:

> chatting to channel: hackmudguide

Now all of your messages sent from chat window will be sent to the user
`hackmudguide` If you attempt to send messages to a user that doesn't exist, you
will receive an error message.

## How to Change the Color of Your Chat Message Text

To change the color of your chat message text, wrap the word(s) or letter(s) you
want to change in backticks (`) followed by the letter code of the color you
want to use. For example, to make your entire message red:

```javascript
chats.send{channel: "0000", msg: "`DHello world`"}
```

To only make a single character red and leave the rest the default color
(#7AB2F4 or S):

```javascript
chats.send{channel: "0000", msg: "`DH`ello world"}
```

Here is a complete list of all Hackmud color codes and their corresponding
colors:

| Color Code | Hext Code |
| :--------- | :-------- |
| 0          | #CACACA   |
| 1          | #FFFFFF   |
| 2          | #1EFF00   |
| 3          | #0070DD   |
| 4          | #B035EE   |
| 5          | #FF8000   |
| 6          | #FF8000   |
| 7          | #FF8000   |
| 8          | #FF8000   |
| 9          | #FF8000   |
| a          | #000000   |
| b          | #3F3F3F   |
| c          | #676767   |
| d          | #7D0000   |
| e          | #8E3434   |
| f          | #A34F00   |
| g          | #725437   |
| h          | #A88600   |
| i          | #B2934A   |
| j          | #939500   |
| k          | #495225   |
| l          | #299400   |
| m          | #23381B   |
| n          | #00535B   |
| o          | #324A4C   |
| p          | #0073A6   |
| q          | #385A6C   |
| r          | #010067   |
| s          | #507AA1   |
| t          | #601C81   |
| u          | #43314C   |
| v          | #8C0069   |
| w          | #973984   |
| x          | #880024   |
| y          | #762E4A   |
| z          | #101215   |
| A          | #FFFFFF   |
| B          | #CACACA   |
| C          | #9B9B9B   |
| D          | #FF0000   |
| E          | #FF8383   |
| F          | #FF8000   |
| G          | #F3AA6F   |
| H          | #FBC803   |
| I          | #FFD863   |
| J          | #FFF404   |
| K          | #F3F998   |
| L          | #1EFF00   |
| M          | #B3FF9B   |
| N          | #00FFFF   |
| O          | #8FE6FF   |
| P          | #0070DD   |
| Q          | #A4E3FF   |
| R          | #0000FF   |
| S          | #7AB2F4   |
| T          | #B035EE   |
| U          | #E6C4FF   |
| V          | #FF00EC   |
| W          | #FF96E0   |
| X          | #FF0070   |
| Y          | #FF6A98   |
| Z          | #0C112B   |