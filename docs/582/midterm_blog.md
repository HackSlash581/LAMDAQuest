# L.A.M.D.A Quest:  Status

## HackScript Language

At the beginning of the semester, the compiler was directly translating HackScript into Javascript.  For example, the HackScript line

```
player.x: 100
```

was being compiled to

```js
var player.x = 100;
```

This required very specific code to get the properties of the `player` object to update properly. The main goal with HackScript this semester has been to make it more general, so that it can use general functions to update any object.  A big step in that direction was to update the compiler to return functions that can then be called on any object as the `this` parameter.  The above assignment statement is now compiled into

```js
(function() {
  this.x = 100;
})
```

The function is then called with the `player` object functioning as `this` like so

```js
compiledHackScript.call(player);
```

Conditionals are also compiled to functions now.  The HackScript

```
if player.health < 20: heal
```

becomes

```js
(function() {
  if(this.health < 20) {
    this.heal();
  }
})
```

Instead of calling the function immediately, however, this function is assigned to a property on the object called `ifScript`.  That function is then called by the engine for all scriptable objects every second, if it's defined.

Timeouts were updated in a similar fashion.  This is helping us realize a more general scripting framework.  The challenge now is figuring out interesting things to do with these capabilities.  We've decided to resort to solving puzzles with a programmable ally, even though we wanted to avoid that, because we simply can't think of anything else to do besides change properties, which doesn't even require a scripting language.  

## Code Structure

Another challenge we've had this semester has been dealing with a growing and increasingly unmanageable code base. Javascript lacks native ways to organize code, such as classes and module, so our code quickly turned into spaghetti as we tried our own methods of organization.  This semester we tried to clean things up with `require.js`, which is supposed to make code re-use and importing easier. It helped, but not as much as we would have liked.  Part of the problem is that Phaser, the game engine we're using, is made for games of a smaller scope such as single-screen games.  It's difficult to structure our code and have it play nice with Phaser at the same time.  At this point, we have learned enough to structure a large Phaser game nicely if we started from scratch, but it's hard to justify spending precious time on an aspect that doesn't affect the actual gameplay.

## Game Progression, sprites and tilemaps
Currently we've made a tutorial level dungeon tile maps and proggression, along with writing out the first few levels of dialogue/story and interactions with npc's. The player stats, level progresion and talent trees have all been written out with flavor text as well as some basic items and armor. We are currently working on implementing a decent dialogue system and UI so we can effectively add everything we have created into the game. Once that is completed we will figure out the best way to add in the talent tree and anytime we have left after that will be spent adding further depth to the game through dialect and dungeons. 