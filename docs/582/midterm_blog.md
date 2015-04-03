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

## Gameplay
The current version of the game has a user controlled main character that can walk around our demo map.  This character has animations for walking and attacking that are created using an open source sprite sheet we obtained.  The character can also pick up items such as the spear and the bow and have this reflected in the character animations.  Switching between weapons is currently done using simple behind the scenes Boolean values, but we would like to add a graphical representation of the characters inventory.  Enemies in the game currently have very basic logic, but collisions with them are all set up.  These enemies have a chance to drop a scripting rune when they are killed.  These runes can be collected by the player and ideally in the future these runes will determine how many scripts the user can write.  The display of the game features the player’s health, scripting runes, and ammo in the top left portion of the screen and the player’s level and experience in the top right portion.  Currently the advancement in levels is not tied to anything in the gameplay, but we would like to allow more scripting abilities for the user as they advance through the game.  The most recent addition to the game was an ally that follows the character around and can attack the closest enemy on the user’s command.  We would like to incorporate timeouts into this programmable ally, however we are having trouble thinking up creative ways to use our scripting abilities.


## Game Progression, sprites and tilemaps
Currently we've made a tutorial level dungeon tile maps and progression, along with writing out the first few levels of dialogue/story and interactions with NPC's. The player stats, level progression and talent trees have all been written out with flavour text as well as some basic items and armour. We are currently working on implementing a decent dialogue system and UI so we can effectively add everything we have created into the game. Once that is completed we will figure out the best way to add in the talent tree and anytime we have left after that will be spent adding further depth to the game through dialect and dungeons. 

## Phaser Limitations and workarounds
Using the Phaser framework was a quick decision without very extensive being done before hand. This has ultimately led to some pros and cons. The biggesst pro being that it was relatively simple to get our project up and going and have interactable prototypes. Unfortunately one of the cons is that phaser seems to be designed with much simpler games in mind. Phaser uses the concept of game states, and the default recommendation is to make a new state for each level of the game. This works great for games such as Candy Crush or the like where information isn't carried between levels. However we are designing an RPG game, and the player data must persist throughout the game. Thus we end up using a single state to control the game, and we had to find a workaround to load new maps as appropriate (because by default maps are associated with states, and phaser only expects on map per state). This has posed a more significant challenge than originally expected. To handle it, we have created a map controller class. This class has a load map method, which unloads the current tilemap (if any), loads in the new tilemap by name and its associated tilesets. Simply swapping maps was trickier than expected, but overall not too bad. However, repositioning the character appropriately in the new world turned out to be a huge headache. In Phaser you can set collisions with specific tiles or even entire layers (as we have done with the GameEntities layer for world object). Initially I attempted to specify a tile as a door to trigger transitions between maps. Setting up collision detection for this is easy, however there's not a way to store unique information on a per tile basis this way. Thus I could detect stepping on the door tile, but had no way of knowing which map it led to or where on the map it leads. In Tiled (the map editor Phaser is designed to work with), you can create object layers which work somewhat differently from a normal tile layer. For our purposes, you can give many objects the same name, but still attach unique properties to each instance. Thus I created an object over each door tile with a tomap and todoor field so the engine can figure out which map should be loaded and where on that map to position the character. This great idea came with it's own unique set of headaches however as phaser by default doesn't actually support collisions with the object layer. Finally after digging through the Phaser docs I discovered that I could create a Sprite (a Phaser class) from objects on the object layer. Phaser does support collisions with Sprites, and instantiate Sprites from the object layer will keep any unique properties set in Tiled. After setting a transparent sprite to work as a collision trigger we can finally place the character in the new map at the appropriate position.