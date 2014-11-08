#I. Game Concept

1.  **Introduction**
  
  Imagine a 2D adventrue game in the style of the original Zelda with a Minecraft level of world interaction, except instead of being able to merely interact with everything in the world, you can program everything in the world.  Everything is scriptable.  The player can attach custom scripts written in our own simplified language, HackScript, to any game entity.  We're proposing a new kind of game that will unleash creativity, teach programming, and allow for a completely unique and individualized gaming experience.  We're proposing *L.A.M.D.A Quest: Live Action Modding with Dynamic Associations*.   
2.  **Description**

  A typical game session would play out as follows.  You begin as an adventurer in the world with a fantasy setting.  After getting used to navigatig the world and dueling a few enemies with your sword, you meet another character that would like to join you on your journies and become your apprentice.  That character is now in your party, however, in order to control that character, you will have to write a script for that character to follow.  You puase the game and open the character's scripting pane, and since this is early in the game, you don't have many options yet.  Right now you can just set the character's `behaviour` property to one of three values: `aggressive`, `defensive`, or `passive`.  The character explains to you that these properties mean he will attack everything in sight, attack only if attacked, and attack no one, respectively.  

  You are in the mood for a good fight, so you type `behavior: aggresive` into the scripting pain and click "Execute."  You unpause the game and continue on your adventure, your aggressive friend in tow.  A few goblins approach your party and your apprentice makes quick work of them.  Suddenly you come upon a group of sleeping goblins.  It is obvious to you that waking them will not result in a victorious encounter.  That's when you notice that your apprentice is charging towards them with an insane lust for blood in his eye.  You quickly pause the game before he can do any damage, open his scripting pane, and type a line of HackScript, `behaviour: passive`.  Whew!  That was close.  You rethink your script, and decide it would be better to give your apprentice conditional behaviour, and type the line `if count.enemy > 5: behaviour: defensive else: behaviour: aggressive`.  Now your cohort will only be heedlessly aggressive when you are not outnumbered two to one!

  As you progress in the game, you gain access to more elemnets of the language and are able to control the character to a higher degree.  Later in your journey, for example, you learn that you can access the property `enemy.life` to see how many hit points that monster has.  You then decide to write a script that tells the character to attack any monster that comes within two tiles of you with a normal attack, and use a special attack if that monster has more than 20 hit points: `if enemy.life > 20: attack: spear else: attack: fireMagic`. 
  After gaining some more experience you acquire a new weapon, a wand of flame.  The default behavior for this weapon is to shoot a straight line of flame that travels 3 tiles per second.  As you gain experience with this item by using it multiple times, your item knowledge increases, and you gain access to new properties of the wand.  You decide that the flame travels too fast for the task at hand, so you open the wand's scripting pane and type `flameWand.speed: 1`.  Now your flames hang around a little longer, making it more difficult for enemies to get to you.
  
3.  **Key Features**
 * Open, procedurally generated world
 * Programmable game entities
 * Scalable access to new properties and functions of items, tiles, and enemies
4.  **Genre**
  
 Our first goal is to create a sandbox world so we can explore and experiment with different ideas while we get the game and scripting engine figured out and working smoothly.  This will be similar in genre to Minecraft, where the only goal is for the player to do as he or she chooses.  We expect to have the sandbox version working by the end of this semester or early next semester.  The next step is to add dungeons to the world where the gameplay would resemble an adventure RPG.  In the dungeons we can present specialized challenges that require creative use of HackScript to overcome.  This involves puzzles, monsters with certain weaknesses, obstacles that can only be overcome by writing scripts, and so on.
  
5.  **Platforms**
  
 We are choosing to develop the game for the browser as a web application.  The reasons for this choice are as follows.  We are interested in gaining more experience with web development, Node.js, and JavaScript.  JavaScript's `eval` function allows us to execute the compiled HackScript that we send to the client (for a more thorough explanation, see the Technical Analysis below).  Additionally, the JavaScript game framework [Phaser](http://phaser.io) allows for exremely rapid prototyping. In phaser it takes 30 minutes to do what would take hours to do with C++ and SDL, for example.  It also has support for spritesheets, animations, tiled maps, music, sound effects, and more.  

6.  **The Current State of Modifiable Games**

 Currently, Minecraft "mods" (user modified versions of the game) are extremely popular and provide endless hours of creativity and enjoyment stemming from a very simple game.  However, there is a steep learning curve to creating a mod.  Here are the steps a user must take to modify and play a new version of Minecraft.
  1. Stop playing the game
  2. Learn a modding framework
  3. Learn how to program in Java
  4. Write code in an editor or IDE
  5. Compile the code into a jar
  6. Load the game with the new mod
  7. Play the modified version
  8. Repeat

 Each step represents a significant time investment, and modding is out of reach for the average Minecraft player.  LAMDA Quest proposes a simplified modification scheme, aimed at getting more people able to modify the game more quickly with a much more shallow learning curve.
  1. Pause the game
  2. Type a line of HackScript with help from the cheatsheet
  3. Unpause the game, and play the new version. Instant gratification!
 
 Since modding is so appealing, we feel that this is a successful model for a game.
  
7.  **Market Analysis**
  
 About a month after coming up with the original idea for LAMDA Quest, we discovered a game called [Hack 'n' Slash](http://hacknslashthegame.com) that seemed to be an exact replica of our idea.  Our original name for the game was HackSlash. We were a little dissappointed that our idea had already been done (witht the same name even!), but rather than let this discourage use, we felt that our idea was validated, and that it was good enough to be making money on Steam.  Additionally, Hack 'n' Slash only allows the player to access properties of objects and change them with a graphical interface.  One can slide the enemy.health property from 20 to 0, for example.  Our game goes a step further and allows the actual programming of entities with conditional branching, looping, and assignment.  Additionally, Hack 'n' Slash lets the player do ridiculous things like have an enemy drop 75 hearts so the player will always have full health.  We plan on restricting access to property levels.  This is made easier with the HackScript language.  Hack 'n' Slash proves that there is a market for this kind of game, and LAMDA Quest takes Hack 'n' Slash to the next level. 
8.  **Technical Analysis**

  Using our own programming language for game entity scripts gives us several distinct advantages.  First, it will allow us a fine grain of control over what the user can do with scripting.  We can give the player access only to the language constructs that we deem appropriate for the task at hand, and scale the possibilites up as the game progresses. Second, we initially considered allowing the user to directly type in JavaScript or Lua, but that would present many security issues.  With our own language, we can compile it to JavaScript and execute it with the knowledge that nothing harmful can be done since everything the user types in has to make it through the HackScript parser. Third, using a simple language will reduce the overall complexity and allow us to finish the year with a playable game.  Finally, creating a programming language just sounds fun!

#III.  Functional Specification

1.  **Game Mechanics**
  1.  Core Game Play
  2.  Game Flow
  3.  Characters/Units
  4.  Game Play Elements
  5.  Game Physics and Statistics
  6.  Artificial Intelligence
  7.  Multiplayer
2.  **User Interface**
  1.  Flowchart
  2.  Functional Requirements
  3.  Mockups
  4.  GUI Objects
3.  **Art and Video**
  1.  Overall goals
  2.  2D Art and Animation
  3.  GUI
  4.  Terrain
  5.  Game Play Elements
  6.  Cinematics
4.  **Sound and Music**
  1.  Sound Effects
    *  GUI
    * Special Effects
    * Characters
    * Game Play Elements
    * Environment
    * Motion
  2.  Music
    * Event Jingles – success/failure/death/victory etc.
    * Shell Screen
    * Level Theme
    * Situations
5.  **Story**
6.  **Level Requirements**
  1.  Level Diagram
  2.  Asset Revelation Schedule
  3.  Level Design Seeds

#V.  Implications

At the heart of our application is the ability to inject code into a running application.  This has some implications beyond our goal of a scriptable game.  Our architecture can serve as a model for a web application that can be updated without having to restart the server.  Imagine fixing a bug in a web application by simply typing in a list of changes on the command line.  Those changes would be put into an object that would notify the application that properties of existing objects have changed, and that it should update itself.  While this would be usefule for small fixes, it is probably not feasable to add entire modules to a running application.  

#VI.  Timeline

(Insert Gantt chart here)

#VII.  Budget


#VIII.  Team Members

1.  **Kevin Bajaj**
2.  **Greg Ervin**
3.  **Thomas Ford**
4.  **Sean Hannah**
5.  **Chris Hogan**
6.  **Grant Steuart**