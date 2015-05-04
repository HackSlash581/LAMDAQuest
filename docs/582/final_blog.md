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