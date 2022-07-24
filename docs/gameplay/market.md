---
title: Market
parent: Gameplay
---

# The Market

The market is where users can buy and sell upgrades (including locks) for GC.

## Browsing

You can browse the market with:

```javascript
market.browse{}
```

And one or more of the following options: 

### By Tier

`tier` filters the results to only show upgrades at the passed in tier (1-4):

```javascript
market.browse{tier: 1}
```

### By Seller

`seller` filters the results to only show upgrades sold by a particular user:

```javascript
market.browse{seller: "opnsrce"}
```

### By Date Posted

`listed_before` filters the results to only show upgrades listed no later than
the passed in timestamp:

```javascript
market.browse{listed_before:1490286018.35423}
```

`listed_after` filters the results to only show upgrades listed no earlier than
the passed in timestamp:

```javascript
market.browse{listed_after:1490286008.35423}
```

### By Rarity

`rarity` filters the results to only show upgrades with the specified rarity.

```javascript
market.browse{rarity: 1}
```

### By Cost

`cost` filters the results to only show upgrades that cost the passed in amount:

```javascript
market.browse{cost: "1000GC"}
```

### By Type

`type` filters the results to only show upgrades of the passed in type: `lock`,
`script_space`, `script`, `tool`:

```javascript
market.browse{type: "script"}
```

### By Name

`name` filters the results to only show upgrades with the passed in name:

```javascript
market.browse{name: "char_count_v1"}
```

### By Class

`class` filters the results to only show upgrades that belong to the passed in
class: `architect` `executive`, `infiltrator`, `scavenger`.

```javascript
market.browse{class: "scavenger"}
```

### By Field Value

You can also filter by an field that exists on an item being sold. For example,
if you wanted to filter by items that have a `chars` field with a value greater
than or equal to 200:

```javascript
market.browse{chars:{"$gte": 2000}}
```

For more information about what comparison operators are available, see the
[mongoDB documentation](https://www.mongodb.com/docs/manual/reference/operator/query-comparison/).

### View Item Details

To view more details about an item, use its token:

![](../../assets/images/market.browse.png)
![](../../assets/images/item-details.png)

```javascript
market.browse{i:"u5atpi"}
```

## Buying

Buying an item from the market is as easy as providing the item's token:

```bash
u5atpi 1KGC     w4rn_message
```

```javascript
market.buy{i:"u5atpi"}
```

## Selling

To sell an item on the market, use its index listed in `sys.upgrades`:

![](../../assets/images/sys.upgrades.png)

```javascript
market.sell{i: 1, cost: "1KGC", confirm: true}
```

Additionally, you can specificy a description and whether or not you want to
be notified if the item sells (defaults to `true`):

```javascript
market.sell{i: 1, cost: "1KGC", description: "my fave upgrade", no_notify: false, confirm: true}
```

Putting an item up for sale costs 1000 GC or 5 percent of the asking price
(whichever is larger). When the item sells, there's a 10% fee based on the sale
price.

**Selling Multiple Items at Once:**

If you have multiple items of the same tier and rarity you want to sell, you can
specify a count:

```javascript
market.sell{i: 1, cost: "1KGC", count: 4, confirm: true}
```

This will list all 4 `public_script_v1` scripts on the marketplace for 1KGC
each.

You can only sell multiples of an upgrade if the upgrades have the same tier,
rarity, and stats. Becuase of this you cannot sell multiple upgrades beyond
rarity 1 (`kiddie`) because upgrades of rarity 2 or higher have unique stats
_per upgrade_.

## Removing an Item For Sale

When you put on item up for sale, you'll be given a private `token`. This is the
unique ID for that sale that will allow you to de-list and item and return it to
your system:

```javascript
market.sell{delist: "abcdefg"}
```

## Cold Storage

If you have one or more upgrades that you want to keep available but don't want
them to take up space in your inventory, you can list it for sale on the
marketplace and set the price to a value that no other players will see as a
good deal. When you need the upgrade, simply de-list it using the upgrade's sale
token.