# *L.A.M.D.A Quest Final Blog*

# Hackscript

## Assignment

### What we did

The game allows the player to change any property on a scriptable object he or she wishes. We decide which properties we show the player in the scripting view, but if the player can guess the name of a property, they can all be changed, even properties that are part of the Phaser engine.

### What we learned

We discovered that changing properties can be fun, but in many cases it is more fun in terms of a game experience to change properties through gameplay, buttons, or other UI elements instead of typing the data in.  Also, assignment doesn't add much in terms of interesting scripting capabilities.  Anything that can be done with assignment can be done with an in-game button.  We had trouble thinking of ways to make it more interesting.

## Timeouts

We were able to get timeouts working. The player can type `every 2000: heal` and a function will be called every two seconds for 10 seconds that adds 10 life to the player's life total.  This is the only thing we implemented. 

### What we did

We were able to get timeouts working. The player can type `every 2000: heal` and a function will be called every two seconds for 10 seconds that adds 10 life to the player's life total.  This is the only thing we implemented. We had difficulty coming up with creative ways to use this feature in the game.  The 'heal' timeout was the only thing we could think of.  

### What we learned

Since our scripting language does not support functions, any timeout the player wishes to call must be predefined in JavaScript.  We also had to predefine how long it would last, and the specific details (10 health, etc.).  In order to have a fully functional timeout system in our game, HackScript would need to support the declaration of player-defined functions.  We were unable to get that finished.

## Conditionals 

### What we did

Conditionals work in the game to a very limited extent.

### What we learned

When the player-submitted HackScript is compiled, it only has a reference to the object that the player clicked on in the pause menu.  For this reason, the kinds of things that would make conditionals interesting were not possible.  Our original idea was to have the hero cast a spell or heal if an enemy came near, like so:  `if enemy.distance < 20: hero.castSpell(enemy)`.  However, this code requires references to two objects, the hero and the enemy.  The only way we could make this work was by hardcoding behavior into the engine, which defeats the point of scripting.  

Overall, we still like the idea of scripting a running game, but the challenge of allowing the player a good amount of freedom while still restricting things to make the game challenging proved to be too much for us.  With the exception of property assignment, everything required hard-coded behavior in the engine.  

# Gameplay

The main character is moved around the map using w,a,s,d buttons and fires the current weapon on mouse click in the direction of the mouse.  There is a spear that the user can pick up as soon as the game starts and a bow that can be found later in the game.  Then the user can switch between the weapons using the buttons 1 and 2.  The walking and shooting animations also change when the user switches weapons.

The first type of enemies the user encounters are the beavers in the starting area, these simply charge at the user and must be killed before they reach him.  Ten beavers must be killed before they stop spawning.  These beavers, along with all other enemies, have a chance to drop scripting runes that can be collected and used as a scripting currency.  After defeating all the beavers scripting must be used to teleport out of the fenced in area to reach the rest of the map.  The user will then encounter patrolling enemies while exploring the map, these enemies will charge at the user when they get close enough to them.  The user can then enter the dungeon with the entrance located in the bottom left corner of the map.  

In this dungeon they will encounter several mage enemies that are constantly firing bullets.  After they successfully navigate their way to the end of the dungeon they will see a blue flame.  When the blue flame is picked up, a boss spawns.  This boss rapidly alternates between firing a fireball toward the enemy and then in a random direction.  The boss also must be hit ten times to be destroyed, this creates a difficult encounter that the user may need to use scripting to successfully complete. 

--- Gameplay Part 2 (read and edit into previous, maybe)
In our working version of the game, we have two areas to the map to be able to explore. The initial part of the map is a tutorial level where you have to use the scripting feature in order to be able to progress past the starting location. It is designed so that you have to be able to kill the first enemies presented to you so that you can pick up the rune drop which allow you to access the scripting feature. Once you can do this, you are allowed to “teleport” yourself a brief distance over the fence to explore the rest of the map. 

Once outside, you we meet your second enemy who will randomly roam the map until they get close to you, which then they will rush you down. This lets the player know that their current speed is too slow, so they need to modify it slightly to be able to survive successfully. Once you roam the map long enough, you will find an entrance that will take you directly towards the second area of the map; the dungeon. 

Inside the dungeon, you will meet the third set of enemies who are mages who launch fireballs at you. Once you get to this point, however, you will learn that you run out of ammo for your weapons very quickly, so you have to program yourself more ammo inside the scripting menu for your player. These mages get you ready to learn how to dodge projectiles and fight at the same time. If you follow the dungeon to the end, you are faced with the final boss who is spawned by entering its chamber. The final boss will move throughout the final chamber and spew fireballs in all directions until he is defeated. These sections of the map allow the player to realize that he must be able to use his scripting ability to its fullest ability to be able to survive the challenges that this world will throw at him.
---

# Design - User interface - Game Progression
While pulling into the final week of the project it became apparent that the order of design progression should have been done differently. We had designed the the flavor text, talent trees, items, game progression before we had implemented a UI and a good text system. That being said there is an extensive amount of game features designed and planned out that we just didnt have time to implement (on our github they are under assets->game progression). In the future when making a game we learned that it is imperative that time is spent on the User Interface and text display first and then to fill it with content.  

#Maps, Phaser, and Limitations
As discussed in an earlier blog, maps ended up being quite an ordeal within Phaser. Phaser appears to be designed with much smaller, simpler games in mind. The default method suggested for changing maps, is to change to a new "state" in the game engine. Unfortunately there are quite a few side effects of this. No information is retained when switching states by default. Thus in order to use states to switch maps, we had to either save all the data from the previous map and try to reload it in the new state, a tedious ordel, or we had to rebuild the data when we entered a new state. Rebuilding the data means no persistence, your health would simply be reset to default every time you switched maps. Saving all the data would have been an exceptionally tedious ordeal, and there really isn't a great reason given our context for continually destroying and rebuilding game objects every time the map changes. We did research into alternate way of switching maps, but unfortunately never came across a truly viable solution within the Phaser framework. It was a pretty simple matter to destroy the old map without changing states when you, for instance, went into a tent. However loading the new map was quite a bit harder than anticipated. This again relates to the Phaser framework. Despite the tilemap JSON files explicitly listing any required tilesets, Phaser would not detect this and load them automatically. This meant that for each map we wanted to implement, we would have to manually load all of the assets each time we switched maps. This may have been a reasonable solution for a small number of maps, but our end goal was a large number of maps. Another issue was moving the character when you change maps in this way. Once we managed to delete the old map, and load a new one, the character would retain his old position, which often made no sense such as ending up outside of the tent in the inky blackness. We attempted to add game objects to the tilemap, to represent doors, and to contain references to the map and door on that map that it leads to. Unfortunately we again ran into limitations with the Phaser framework. Ideally, when the player collided with these door game objects, it would do the map transition. However, Phaser doesn't allow for collisions between sprites and game objects. We attempted to make the doors into tiles since Phaser does allow collisions between sprites and tiles, however Phaser doesn't allow you to attach extra information to individual instances of tiles. The end result being that every door led to the same place. Finally at the end of the semester and without further time we were unable to implent actual map changes. Phaser is an interesting and fun framework to mess around with, but is far from robust, and it's documentation and training resources are somewhat lackluster. In the future I would use a strong, well established game engine such as Unity3D. The immense collection of training resources online would have saved us the countless hours we dumped into trying to figure out and work around the Phaser framework.
